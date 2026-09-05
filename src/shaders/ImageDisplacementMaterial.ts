import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const ImageDisplacementMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uTexture: new THREE.Texture(),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uHover;
    uniform sampler2D uTexture;
    
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Calculate liquid distortion based on hover state and time
      float wave = sin(uv.y * 15.0 + uTime * 3.0) * 0.03 * uHover;
      float wave2 = cos(uv.x * 10.0 + uTime * 2.0) * 0.02 * uHover;
      
      // RGB Fringing / Chromatic Aberration on Hover
      float r = texture2D(uTexture, uv + vec2(wave, wave2)).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - vec2(wave, wave2)).b;
      
      vec3 color = vec3(r, g, b);
      
      // Convert to pure grayscale when NOT hovered, full color when hovered
      float luminance = dot(color, vec3(0.299, 0.587, 0.114));
      vec3 finalColor = mix(vec3(luminance), color, uHover);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);
