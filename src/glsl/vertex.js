export const vertex = /* glsl */ `
    uniform float uTime;
    attribute vec2 aCoords;
    varying vec2 vUv;

    void main() {
        vUv = uv;

        vec3 pos = position;
        pos.x += sin((uv.x + uTime) + 10.0) * 0.1;
        vec4 mvPosition = modelViewMatrix * vec4( pos, 1. );
        gl_Position = projectionMatrix * mvPosition;
    }
`;