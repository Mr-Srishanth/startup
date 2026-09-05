import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, useScroll as useDreiScroll, ScrollControls, Scroll } from '@react-three/drei';
import * as THREE from 'three';

function CarouselItems({ images }: { images: string[] }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useDreiScroll();
  const radius = 3;
  const count = images.length;

  useFrame((state, delta) => {
    if (group.current) {
      // Rotate the entire cylinder based on scroll position
      const targetRotation = scroll.offset * Math.PI * 2;
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRotation, 4, delta);
    }
  });

  return (
    <group ref={group}>
      {images.map((url, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <Image 
              url={url} 
              transparent 
              side={THREE.DoubleSide}
              scale={[2, 2.5]} 
              toneMapped={false}
              grayscale={1}
            />
          </group>
        );
      })}
    </group>
  );
}

export function WebGLCarousel({ images }: { images: string[] }) {
  // If there are less than 5 images, duplicate them to make a full circle
  const filledImages = images.length < 5 ? [...images, ...images, ...images].slice(0, 6) : images;

  return (
    <div className="w-full h-[80vh] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: false }}>
        <fog attach="fog" args={['#000000', 3, 8]} />
        <ambientLight intensity={1} />
        <ScrollControls pages={2} horizontal={true}>
          <CarouselItems images={filledImages} />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
