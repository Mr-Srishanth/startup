import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const DepthMaterial = shaderMaterial(
  {
    uTime: 0,
    uScroll: 0,
    uVelocity: 0,
    uWarp: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uColor1: new THREE.Color('#000000'),
    uColor2: new THREE.Color('#111111'),
    uColor3: new THREE.Color('#222222'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader (Procedural Noise and Infinite Tunnel)
  `
    uniform float uTime;
    uniform float uScroll;
    uniform float uVelocity;
    uniform float uWarp;
    uniform vec2 uMouse;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    varying vec2 vUv;
    varying vec3 vPosition;

    // Classic 3D Noise function
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 1.0/7.0; 
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vec2 st = vUv * 2.0 - 1.0;
      
      // Smooth Mouse Parallax
      vec2 mouseOffset = (uMouse - 0.5) * 0.5;
      
      // Apply Scroll Velocity and Hyperspace Warp Stretch
      vec2 stretchedSt = st;
      // Pull the edges outwards during warp
      stretchedSt *= 1.0 - (uWarp * length(st) * 0.3);
      // Extreme vertical stretch during warp + scroll velocity
      stretchedSt.y *= 1.0 + (abs(uVelocity) * 5.0) + (uWarp * 15.0);
      
      // Plunge forward into the depth during warp
      float depth = uScroll * 10.0 + (uWarp * uTime * 40.0);
      
      // Inject subtle mouse offset and depth into position computation
      vec3 pos = vec3(stretchedSt.x * 2.0 + mouseOffset.x, stretchedSt.y * 2.0 + mouseOffset.y, uTime * 0.2 - depth);
      
      float noiseValue = snoise(pos * 1.5);
      float noiseValue2 = snoise(pos * 3.0 - vec3(0.0, 0.0, uTime * 0.5));
      
      float combinedNoise = (noiseValue + noiseValue2 * 0.5);
      
      float lines = smoothstep(0.4, 0.45, fract(combinedNoise * 5.0));
      
      vec3 color = mix(uColor1, uColor2, combinedNoise + 0.5);
      
      color = mix(color, uColor3, lines * 0.3 * clamp(uScroll + (uWarp * 5.0), 0.0, 1.0));

      float vignette = length(st);
      color *= 1.0 - vignette * 0.5;
      
      // Flash white/bright at max warp
      color = mix(color, vec3(1.0), uWarp * 0.5 * lines);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);
