import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useScroll, useVelocity, useSpring } from 'framer-motion';
import * as THREE from 'three';
import { DepthMaterial } from '../shaders/DepthMaterial';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { soundEngine } from '../utils/audio';
import { useAppStore } from '../utils/store';

extend({ DepthMaterial });

function BackgroundMesh({ scrollYProgress }: { scrollYProgress: any }) {
  const materialRef = useRef<any>();
  const { pointer } = useThree();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uScroll = scrollYProgress.get();
      materialRef.current.uVelocity = smoothVelocity.get();
      
      const isTransitioning = useAppStore.getState().isTransitioning;
      // Smoothly animate warp
      materialRef.current.uWarp = THREE.MathUtils.lerp(
        materialRef.current.uWarp, 
        isTransitioning ? 1 : 0, 
        0.05
      );
      
      soundEngine.updateScrollVelocity(smoothVelocity.get());
      
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, pointer.x * 0.5 + 0.5, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, pointer.y * 0.5 + 0.5, 0.1);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[20, 20]} />
      {/* @ts-ignore */}
      <depthMaterial ref={materialRef} />
    </mesh>
  );
}

function InsanePostProcessing() {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
      <Noise opacity={0.08} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}

export function GlobalCanvas() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ powerPreference: "high-performance", antialias: false }}>
        <BackgroundMesh scrollYProgress={scrollYProgress} />
        <InsanePostProcessing />
      </Canvas>
    </div>
  );
}
