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
    const rows = 512;
    const columns = 512;
    const halfColumns = Math.floor(columns / 2);
    const halfRows = Math.floor(rows / 2);
    
    const [ vertices, locationCoords ] = useMemo(() => {
        const positions = [];
        const coordinates = [];
        for (let x = 0; x < columns; x++ ) {
            // center x
            const posX = x - halfColumns;
            for ( let y = 0; y < rows; y++ ) {
                // center y
                positions.push(posX * 2, (y - halfRows) * 2, 0);
                coordinates.push(x/columns,y/rows);
            }
        }

        return [
            new Float32Array(positions),
            new Float32Array(coordinates)
        ];
    }, [halfColumns, halfRows])

    return (
        <View orbit {...props}>
            <Suspense fallback={null}>
                <Mesh
                  vertices={vertices}
                  positions={locationCoords}
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