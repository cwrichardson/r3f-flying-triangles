'use client';

import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';

import { vertex } from '@/glsl/vertex';
import { fragment } from '@/glsl/fragment';
import { CustomMaterial, CustomDepthMaterial } from './custom-material';
import { useControls } from 'leva';

export const Mesh = forwardRef((props, ref) => {
    const { vertices, positions, ...meshProps } = props;
    const shaderRef = useRef();
    const shadwoRef = useRef();

    const [ len, setLen ] = useState(0);

    useLayoutEffect(() => {
        setLen(ref.current?.geometry.attributes.position.count);
    }, [ref]);

    const uniforms = useMemo(() => ({
        uProgress: { value: 0.5 },
        uTime: { value: 0 }
    }), [])

    const { progress } = useControls({
        progress: {
            value: 0.5,
            min: 0,
            max: 1,
            onChange: (v) => {
                uniforms.uProgress.value = v;
            }
        }
    })

    // normall we do this one layer up, in the model, but we need
    // the count from the mesh, so we might as well do it here
    const [ randoms ] = useMemo(() => {
        const items = [];
        for (let i = 0; i < len; i += 3) {
            const r = Math.random();

            items.push(r, r, r);
        }

        return [ new Float32Array(items) ];
    }, [len]);

    useFrame((state, delta, xrFrame) => {
        // do animation
        uniforms.uTime.value += delta;
        // shadwoRef.current.uniforms.uTime.value += delta;

        // executes 1/frame, so we can just directly morph the ref with a delta
        // ref.current.rotation.x += 0.01;
        // ref.current.rotation.y += 0.02;
    })

    return (
        <mesh ref={ref} {...meshProps}>
            <icosahedronGeometry
              toNonIndexed={true}
              args={[1, 9]}
            >
                <bufferAttribute
                  attach={'attributes-aRandom'}
                  args={[randoms, 1]} />
            </icosahedronGeometry>
            <CustomMaterial
                ref={shaderRef}
                color={0xff0000}
                // extensions={{ derivatives: "#extension GL_OES_standard_derivatives : enable"}}
                vertexShader={vertex}
                uniforms={uniforms}
                // fragmentShader={fragment}
              //   side={DoubleSide}
                // depthTest={false}
                // wireframe={true}
              //   transparent
              />
            <CustomDepthMaterial
                ref={shadwoRef}
                attach={'customDepthMaterial'}
                uniforms={uniforms}
                vertexShader={vertex}
            />
            {/* <meshStandardMaterial color={0xff0000} /> */}
        </mesh>
    )
})

Mesh.displayName = 'Mesh';