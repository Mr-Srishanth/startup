import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Html, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Hero3D } from './Hero3D';
import { Portfolio } from './Portfolio';
import { Pricing } from './Pricing';
import { Contact } from './Contact';
import { ArrowRight, Code, MonitorSmartphone, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { TextReveal } from './TextReveal';

export function SpatialLayout() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    // Move the camera deep into the Z-axis based on scroll progress
    // We multiply by 50 because our scene spans from Z=0 to Z=-50
    const targetZ = -scroll.offset * 55;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ + 5, delta * 4);
    
    // Add subtle camera sway
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, Math.sin(scroll.offset * Math.PI * 2) * 2, delta * 2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, Math.cos(scroll.offset * Math.PI * 2) * 1, delta * 2);
  });

  return (
    <group ref={groupRef}>
      
      {/* 3D Atmospheric Particles */}
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={20} size={2} speed={0.4} color="#ffffff" opacity={0.5} />

      {/* Hero Section (Z = 0) */}
      <group position={[0, 0, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Html transform occlude="blending" distanceFactor={8} position={[0, 0, 0]}>
            <div className="w-[1200px] text-center text-white flex flex-col items-center pointer-events-auto">
              <TextReveal 
                text="We build digital experiences that turn attention into revenue." 
                className="text-8xl font-bold tracking-tighter leading-[0.9] max-w-5xl drop-shadow-2xl" 
                delay={0.2}
              />
              <p className="mt-8 text-2xl text-zinc-300 max-w-2xl mx-auto drop-shadow-lg">
                Stop losing clients to slow, boring templates. We engineer high-performance, conversion-focused websites for modern brands.
              </p>
              <div className="mt-12 mx-auto">
                <MagneticButton className="flex items-center gap-2 bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-zinc-200">
                  See Our Work <ArrowRight className="w-6 h-6" />
                </MagneticButton>
              </div>
            </div>
          </Html>
        </Float>
      </group>

      {/* Services Section (Z = -15) */}
      <group position={[4, -2, -15]} rotation={[0, -Math.PI / 8, 0]}>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <Html transform occlude="blending" distanceFactor={8}>
            <div className="w-[1000px] text-white p-16 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 pointer-events-auto shadow-2xl shadow-black/50">
              <h2 className="text-6xl font-bold mb-16 tracking-tighter">The Engine.</h2>
              <div className="grid grid-cols-3 gap-8">
                <div className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                  <Zap className="w-12 h-12 mb-6 text-white" />
                  <h3 className="text-2xl font-bold mb-4">High Performance</h3>
                  <p className="text-zinc-400 text-lg">Lightning fast loading times built on React to guarantee flawless UX.</p>
                </div>
                <div className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                  <MonitorSmartphone className="w-12 h-12 mb-6 text-white" />
                  <h3 className="text-2xl font-bold mb-4">Spatial Design</h3>
                  <p className="text-zinc-400 text-lg">Perfectly crafted spatial interfaces that shatter the 2D grid.</p>
                </div>
                <div className="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
                  <Code className="w-12 h-12 mb-6 text-white" />
                  <h3 className="text-2xl font-bold mb-4">Conversion</h3>
                  <p className="text-zinc-400 text-lg">We design precise user flows intended to maximize your sales.</p>
                </div>
              </div>
            </div>
          </Html>
        </Float>
      </group>

      {/* Portfolio Section (Z = -30) */}
      <group position={[-5, 2, -30]} rotation={[0, Math.PI / 10, 0]}>
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Html transform occlude="blending" distanceFactor={10}>
            <div className="w-[1400px] pointer-events-auto">
              <Portfolio />
            </div>
          </Html>
        </Float>
      </group>

      {/* Pricing Section (Z = -45) */}
      <group position={[0, -6, -45]} rotation={[-Math.PI / 12, 0, 0]}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <Html transform occlude="blending" distanceFactor={8}>
            <div className="w-[1200px] pointer-events-auto bg-black/40 backdrop-blur-2xl p-16 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
              <Pricing />
            </div>
          </Html>
        </Float>
      </group>

      {/* Contact Section (Z = -55) */}
      <group position={[0, 0, -55]}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
          <Html transform occlude="blending" distanceFactor={10}>
            <div className="w-[1000px] pointer-events-auto">
              <Contact />
            </div>
          </Html>
        </Float>
      </group>

    </group>
  );
}
