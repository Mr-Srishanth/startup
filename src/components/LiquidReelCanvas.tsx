import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { LiquidReelMaterial } from '../shaders/LiquidReelMaterial';
import { ErrorBoundary } from './ErrorBoundary';

extend({ LiquidReelMaterial });

function ReelMesh({ imageUrl, isHovered, mousePos }: { imageUrl: string; isHovered: boolean; mousePos: { x: number, y: number } }) {
  const materialRef = useRef<any>();
  const texture = useTexture(imageUrl);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      
      // Smoothly interpolate hover state
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        isHovered ? 1.0 : 0.0,
        0.1
      );

      // Smoothly interpolate mouse position
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, mousePos.x, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, mousePos.y, 0.1);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <liquidReelMaterial ref={materialRef} uTexture={texture} />
    </mesh>
  );
}

export function LiquidReelCanvas({ imageUrl }: { imageUrl: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - ((e.clientY - rect.top) / rect.height);
    setMousePos({ x, y });
  };

  const fallback = (
    <img 
      src={imageUrl} 
      alt="Cinematic Reel" 
      className="w-full h-full object-cover opacity-80"
    />
  );

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <ErrorBoundary fallback={fallback}>
        <Canvas 
          orthographic 
          camera={{ position: [0, 0, 1], zoom: 1 }} 
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]} // Caps pixel ratio on retina screens to prevent massive frame drops
          performance={{ min: 0.5 }} // Gracefully degrades if GPU struggles
        >
          <Suspense fallback={null}>
            <ReelMesh imageUrl={imageUrl} isHovered={isHovered} mousePos={mousePos} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
