export const vertex = /* glsl */ `
    uniform float uTime;
    
    attribute vec2 aCoords;
    attribute float aRandom;
    varying vec2 vUv;

    void main() {
        vUv = uv;

        vec3 pos = position;
        // pos.x += aRandom * sin((uv.y + uv.x + uTime) * 10.0) * 0.1;
        pos += aRandom * (0.5 * sin(uTime) + 0.5) * normal;
        vec4 mvPosition = modelViewMatrix * vec4( pos, 1. );
        gl_Position = projectionMatrix * mvPosition;
    }
`;