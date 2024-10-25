import { rotationMatrix } from '@/glsl/rotation-matrix';

export const vertex = rotationMatrix + /* glsl */ `
    uniform float uProgress;
    uniform float uTime;
    
    // attribute vec2 aCoords;
    attribute vec3 aCenter;
    attribute float aRandom;
    // varying vec2 vUv;

    vec3 rotate(vec3 v, vec3 axis, float angle) {
        mat4 m = rotationMatrix(axis, angle);
        return (m * vec4(v, 1.0)).xyz;
    }

    void main() {
        // vUv = uv;

        // vec3 pos = position;
        // pos.x += aRandom * sin((uv.y + uv.x + uTime) * 10.0) * 0.1;
        // pos += aRandom * (0.5 * sin(uTime) + 0.5) * normal;

        // csm_Position += uProgress * aRandom * (0.5 * sin(uTime) + 0.5) * csm_Normal;
        // remove time, and just use progress
        // csm_Position += uProgress * aRandom * csm_Normal;
        
        // add rotation based on progress, too
        // csm_Position += uProgress * aRandom * csm_Normal;
        // csm_Position = rotate(csm_Position, vec3(0.0, 1.0, 0.0), aRandom * uProgress * 3.14159 * 3.);
        
        // mistake 1: they all go to one triangle
        // csm_Position *= (csm_Position - aCenter) * uProgress + aCenter;
        
        // scale individual triangles in place
        // csm_Position = (csm_Position - aCenter) * uProgress + aCenter;
        
        // // when we rotate them, we have to add center back after the rotation
        // csm_Position = csm_Position - aCenter;
        // csm_Position *= uProgress;
        // // maybe add this in and do both?
        // // csm_Position = rotate(csm_Position,
        // //     vec3(0.0, 1.0, 0.0),
        // //     aRandom * (1. - uProgress) * 3.14159 * 20.);
        // csm_Position += aCenter;
        
        // csm_Position = rotate(csm_Position,
        //     vec3(0.0, 1.0, 0.0),
        //     aRandom * (1. - uProgress) * 3.14159 * 3.);
        // }

        // csm_Position += normal * aRandom * (1. - uProgress);
        
        //// next: progress happens along y axis
        // float prog = (position.y +1.)/2.;
        // float locprog = clamp((uProgress - 0.8 * prog)/0.2, 0., 1.);

        // // when we rotate them, we have to add center back after the rotation
        // csm_Position = csm_Position - aCenter;
        // csm_Position *= locprog;

        // csm_Position += aCenter;
        
        // csm_Position = rotate(csm_Position,
        //     vec3(0.0, 1.0, 0.0),
        //     aRandom * (1. - uProgress) * 3.14159 * 3.);
        
        // // csm_Position += normal * aRandom * (1. - uProgress);

        //// Mistake 2: tornado of triangles eats the model
        // float prog = (position.y +1.)/2.;
        // float locprog = clamp((uProgress - 0.8 * prog)/0.2, 0., 1.);

        // // when we rotate them, we have to add center back after the rotation
        // csm_Position = csm_Position - aCenter;
        // csm_Position += 3. * normal * aRandom * (locprog);
        
        // csm_Position *= (1. - locprog);

        // csm_Position += aCenter;
        
        // csm_Position = rotate(csm_Position,
        //     vec3(0.0, 1.0, 0.0),
        //     aRandom * (locprog) * 3.14159 * 3.);


        //// next: make appear/disappear work
        float prog = (position.x +1.)/2.;
        float locprog = clamp((uProgress - 0.8 * prog)/0.2, 0., 1.);

        // when we rotate them, we have to add center back after the rotation
        csm_Position = csm_Position - aCenter;
        csm_Position += 3. * normal * aRandom * (locprog);
        
        csm_Position *= (1. - locprog);

        csm_Position += aCenter;
        
        // time "1." at the end is number of rotations; can increase in
        // whole number increments
        csm_Position = rotate(csm_Position,
            vec3(0.0, 1.0, 0.0),
            aRandom * (locprog) * 3.14159 * 1.);
    }
        
`;