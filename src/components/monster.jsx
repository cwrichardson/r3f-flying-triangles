'use client';

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 kneeling-winged-monster-150k-4096-web-v1.glb 
*/

import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';

import { CustomDepthMaterial, CustomMaterial } from './custom-material';
import { useControls } from 'leva';
import { vertex } from '@/glsl/vertex';

export const Monster = forwardRef((props, ref) => {
    const { nodes, materials } = useGLTF('/media/kneeling-winged-monster-150k-4096-web-v1.glb')
    const scale = new Vector3(0.005, 0.005, 0.005);
    
    const geo = useMemo(() => nodes.mesh_0.geometry.toNonIndexed(), []);
    
    const [ len, setLen ] = useState(0); // position count
    const [ positions, setPositions ] = useState([]); // position array

    useEffect(() => {
        setLen(ref?.current.geometry.attributes.position.count);
        setPositions(ref?.current.geometry.attributes.position.array);
    }, [ref, ref?.current?.geometry]);
    
    const uniforms = useMemo(() => ({
        uProgress: { value: 0.5 },
        uTime: { value: 0 }
    }), []);

    const { progress } = useControls({
        progress: {
            value: 0.5,
            min: 0,
            max: 1,
            onChange: (v) => {
                uniforms.uProgress.value = v;
            }
        }
    });

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
    
    return (
        <group {...props} dispose={null}>
            <mesh
                ref={ref}
                geometry={geo}
                scale={scale}
                {...props}
            >
                <bufferAttribute
                    attach={'geometry-attributes-aRandom'}
                    args={[randoms, 1]} />
                <bufferAttribute
                    attach={'geometry-attributes-aCenter'}
                    args={[centers, 3]} />
                <CustomMaterial
                    color={0xff0000}
                    vertexShader={vertex}
                    uniforms={uniforms}
                />
                <CustomDepthMaterial
                    attach={'customDepthMaterial'}
                    uniforms={uniforms}
                    vertexShader={vertex}
                />
            </mesh>
        </group>
    )
});

useGLTF.preload('/media/kneeling-winged-monster-150k-4096-web-v1.glb')
