'use client';

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide, Vector3 } from 'three';

import { vertex } from '@/glsl/vertex';
import { CustomMaterial, CustomDepthMaterial } from './custom-material';
import { useControls } from 'leva';

export const Mesh = forwardRef((props, ref) => {
    const { ...meshProps } = props;
    const shaderRef = useRef();
    const shadowRef = useRef();

    const [ len, setLen ] = useState(0); // position count
    const [ positions, setPositions ] = useState([]); // position array

    useEffect(() => {
        setLen(ref.current?.geometry.attributes.position.count);
        setPositions(ref.current?.geometry.attributes.position.array);
    }, [ref, ref.current?.geometry.attributes.position.count]);

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
    const [ randoms, centers ] = useMemo(() => {
        const items = [];
        const centers = [];

        for (let i = 0; i < len; i++) {
            const r = Math.random();
            
            items.push(r, r, r);

            // get triangle vertices
            const vs = positions.slice( i * 9, i * 9 + 9);

            // calculate center
            const center = new Vector3(vs[0], vs[1], vs[2])
                .add(new Vector3(vs[3], vs[4], vs[5]))
                .add(new Vector3(vs[6], vs[7], vs[8]))
                .divideScalar(3);
            
            // add 3 times, because each triangle vertex needs the center
            centers.push(center.x, center.y, center.z);
            centers.push(center.x, center.y, center.z);
            centers.push(center.x, center.y, center.z);
        }


        return [
            new Float32Array(items),
            new Float32Array(centers)
        ];
    }, [len, positions]);

    useFrame((state, delta, xrFrame) => {
        // do animation
        // uniforms.uTime.value += delta;

        // executes 1/frame, so we can just directly morph the ref with a delta
        // ref.current.rotation.x += 0.01;
        // ref.current.rotation.y += 0.02;
    })

    return (
        <mesh ref={ref} {...meshProps}>
            <icosahedronGeometry
              args={[1, 9]}
            >
                <bufferAttribute
                  attach={'attributes-aRandom'}
                  args={[randoms, 1]} />
                <bufferAttribute
                  attach={'attributes-aCenter'}
                  args={[centers, 3]} />
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
                ref={shadowRef}
                attach={'customDepthMaterial'}
                uniforms={uniforms}
                vertexShader={vertex}
            />
            {/* <meshStandardMaterial color={0xff0000} /> */}
        </mesh>
    )
})

Mesh.displayName = 'Mesh';