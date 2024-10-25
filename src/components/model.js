'use client';

import dynamic from 'next/dynamic';
import { forwardRef, Suspense, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { PerspectiveCamera, SpotLight } from '@react-three/drei';

import { Mesh } from '@/components/mesh';
import { Floor } from './floor';

const View = dynamic(() => import('src/components/view')
    .then((mod) => mod.View), {
        ssr: false
    }
);

export function Model(props) {
    const meshRef = useRef();

    return (
        <View orbit {...props}>
            <Suspense fallback={null}>
                <Mesh
                  castShadow
                  ref={meshRef} />
                <Floor />
                <PerspectiveCamera
                  makeDefault
                  near={0.1}
                  far={3000}
                  position={[2, 2, 2]} />
                <ambientLight intensity={0.8} />
                {/* <directionalLight intensity={0.5} position={[0.5, 0, 0.866]} /> ~60º */}
                {/* <SpotLight /> */}
                <spotLight
                    args={[0xffffff, 1, 0, Math.PI / 3, 0.3]}
                    position={[0, 2, 2]}
                    shadow-bias={0.0001}
                    shadow-camera-near={0.1}
                    shadow-camera-far={9}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    intensity={1}
                    castShadow
                >
                </spotLight>
            </Suspense>
        </View>
    )
}