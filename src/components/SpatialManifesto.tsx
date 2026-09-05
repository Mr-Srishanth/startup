import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { ErrorBoundary } from './ErrorBoundary';

function Word({ children, position, emissiveColor = "#ffffff" }: { children: string, position: [number, number, number], emissiveColor?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    
    // Map normalized pointer coordinates to 3D space
    const mouseX = (pointer.x * viewport.width) / 2;
    const mouseY = (pointer.y * viewport.height) / 2;
    const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);

    // Calculate distance between text and mouse
    const dist = ref.current.position.distanceTo(mouseVec);
    
    // Repulsion physics: If mouse is close, push it away
    if (dist < 4) {
      const dir = ref.current.position.clone().sub(mouseVec).normalize();
      // The closer it is, the stronger the force
      const force = (4 - dist) * 0.15;
      ref.current.position.add(dir.multiplyScalar(force));
    } else {
      // Elastic return to original position
      ref.current.position.lerp(initialPosition, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        ref={ref as any}
        position={position}
        fontSize={2}
        letterSpacing={-0.05}
        anchorX="center"
        anchorY="middle"
      >
        {children}
        <meshStandardMaterial 
          color="#ffffff" 
          emissive={emissiveColor} 
          emissiveIntensity={1.5} 
          toneMapped={false}
        />
      </Text>
    </Float>
  );
}

export function SpatialManifesto() {
  return (
    <section className="relative h-[80vh] w-full bg-black overflow-hidden flex items-center justify-center border-b border-white/10 z-10 cursor-pointer">
      <div className="absolute inset-0 z-0">
        <ErrorBoundary fallback={<div className="w-full h-full bg-black flex items-center justify-center text-white">WE BUILD THE IMPOSSIBLE FUTURES</div>}>
          <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          
          <group position={[0, 0, 0]}>
            <Word position={[-6, 2, 0]} emissiveColor="#555555">WE</Word>
            <Word position={[0, 2.5, -2]} emissiveColor="#888888">BUILD</Word>
            <Word position={[6, 1.5, 1]} emissiveColor="#444444">THE</Word>
            <Word position={[-4, -2, 2]} emissiveColor="#aaaaaa">IMPOSSIBLE</Word>
            <Word position={[4, -2.5, -1]} emissiveColor="#333333">FUTURES</Word>
          </group>

          {/* Cinematic Bloom Post-Processing */}
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.2} />
          </EffectComposer>
        </Canvas>
        </ErrorBoundary>
      </div>
      
      {/* HUD Elements */}
      <div className="absolute top-12 w-full flex justify-between px-6 md:px-12 text-xs font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        <span>Sector 04</span>
        <span>Manifesto</span>
      </div>
      <div className="absolute bottom-12 w-full flex justify-between px-6 md:px-12 text-xs font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        <span>Spatial Typography</span>
        <span>[ Interact ]</span>
      </div>
    </section>
  );
}
