'use client';

import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';

import { vertex } from '@/glsl/vertex';
import { fragment } from '@/glsl/fragment';

export const Points = forwardRef((props, ref) => {
    const { vertices, positions } = props;
    const shaderRef = useRef();

    useFrame((state, delta, xrFrame) => {
        // do animation
        shaderRef.current.uniforms.uTime.value += delta;

        // executes 1/frame, so we can just directly morph the ref with a delta
        // ref.current.rotation.x += 0.01;
        // ref.current.rotation.y += 0.02;
    })

    return (
        <mesh ref={ref}>
            <icosahedronGeometry
              args={[1, 3]}
            >
                {/* <bufferAttribute attach={'attributes-position'} args={[vertices, 3]} />
                <bufferAttribute attach={'attributes-aCoords'} args={[positions, 2]} /> */}
            </icosahedronGeometry>
            {/* <meshBasicMaterial /> */}
            <shaderMaterial
              ref={shaderRef}
              extensions={{ derivatives: "#extension GL_OES_standard_derivatives : enable"}}
              uniforms={{
                  uTime: { value: 0 }
              }}
              vertexShader={vertex}
              fragmentShader={fragment}
              side={DoubleSide}
              depthTest={false}
              transparent
            />
        </mesh>
    )
})

Points.displayName = 'Points';