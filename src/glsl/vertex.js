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

        csm_Position = (csm_Position - aCenter) * uProgress + aCenter;
        
        // vec4 mvPosition = modelViewMatrix * vec4( pos, 1. );
        // gl_Position = projectionMatrix * mvPosition;
    }
`;