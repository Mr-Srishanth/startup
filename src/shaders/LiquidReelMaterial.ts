import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const LiquidReelMaterial = shaderMaterial(
  {
    uTime: 0,
    uHover: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
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
    uniform vec2 uMouse;
    uniform sampler2D uTexture;
    
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      
      // Distance from the mouse in UV space
      // Correct for aspect ratio roughly (assuming 16:9 for the video/reel)
      vec2 aspectMouse = vec2(uMouse.x, uMouse.y);
      float dist = distance(uv, aspectMouse);
      
      // Ripple effect originating from the mouse position
      // Only active within a certain radius, intensified by uHover
      float intensity = smoothstep(0.5, 0.0, dist) * uHover;
      float ripple = sin(dist * 30.0 - uTime * 8.0) * 0.03 * intensity;
      
      vec2 distortedUv = uv + normalize(uv - aspectMouse) * ripple;
      
      // Chromatic Aberration tearing
      float r = texture2D(uTexture, distortedUv + vec2(ripple * 1.5, 0.0)).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - vec2(ripple * 1.5, 0.0)).b;
      
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
);
