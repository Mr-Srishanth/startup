import { useRef, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { ImageDisplacementMaterial } from '../shaders/ImageDisplacementMaterial';

extend({ ImageDisplacementMaterial });

function ImageMesh({ imageUrl, isHovered }: { imageUrl: string; isHovered: boolean }) {
  const materialRef = useRef<any>();
  const texture = useTexture(imageUrl);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      // Smoothly interpolate the hover state
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        isHovered ? 1.0 : 0.0,
        0.1
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <imageDisplacementMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}

export function WebGLImageCard({ imageUrl }: { imageUrl: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} gl={{ antialias: false }}>
        <ImageMesh imageUrl={imageUrl} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
