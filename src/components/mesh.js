'use client';

import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';

import { vertex } from '@/glsl/vertex';
import { fragment } from '@/glsl/fragment';
import { CustomMaterial } from './custom-material';

export const Mesh = forwardRef((props, ref) => {
    const { vertices, positions, ...meshProps } = props;
    const shaderRef = useRef();

    const [ len, setLen ] = useState(0);

    useLayoutEffect(() => {
        setLen(ref.current?.geometry.attributes.position.count);
    }, [ref]);

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
        shaderRef.current.uniforms.uTime.value += delta;

        // executes 1/frame, so we can just directly morph the ref with a delta
        // ref.current.rotation.x += 0.01;
        // ref.current.rotation.y += 0.02;
    })

    return (
        <mesh ref={ref} {...meshProps}>
            <icosahedronGeometry
              toNonIndexed={true}
              args={[1, 4]}
            >
                <bufferAttribute
                  attach={'attributes-aRandom'}
                  args={[randoms, 1]} />
            </icosahedronGeometry>
            <CustomMaterial
                ref={shaderRef}
                color={0xff0000}
                // extensions={{ derivatives: "#extension GL_OES_standard_derivatives : enable"}}
                vertexShader={ /* glsl */ `
                    attribute float aRandom;
                    uniform float uTime;
    
                    void main() {
                        csm_Position += aRandom * (0.5 * sin(uTime) + 0.5) * csm_Normal;
                    }
                `}
                // fragmentShader={fragment}
              //   side={DoubleSide}
                // depthTest={false}
                // wireframe={true}
              //   transparent
              />
            {/* <meshStandardMaterial color={0xff0000} /> */}
            {/* <shaderMaterial
              ref={shaderRef}
              extensions={{ derivatives: "#extension GL_OES_standard_derivatives : enable"}}
              uniforms={{
                  uTime: { value: 0 }
              }}
              vertexShader={vertex}
              fragmentShader={fragment}
            //   side={DoubleSide}
              depthTest={false}
              wireframe={true}
            //   transparent
            /> */}
        </mesh>
    )
})

Mesh.displayName = 'Mesh';