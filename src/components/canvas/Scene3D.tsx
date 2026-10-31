import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { GoldenChicken3D } from './GoldenChicken3D';

interface Scene3DProps {
  scrollProgress: number;
}

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10">
      <Canvas
        camera={{ position: [0, 0.5, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Ambient Lighting */}
          <ambientLight intensity={0.4} color="#fff2db" />

          {/* Key Warm Golden Studio Light */}
          <directionalLight
            position={[4, 5, 4]}
            intensity={2.8}
            color="#fbbf24"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Sizzling Rim Light for crispy edge contrast */}
          <spotLight
            position={[-5, 4, -3]}
            intensity={3.2}
            color="#f59e0b"
            angle={0.6}
            penumbra={0.8}
          />

          {/* Soft Fill Light from below */}
          <pointLight position={[0, -2, 2]} intensity={1.2} color="#b45309" />

          {/* Top Dramatic Spotlight */}
          <spotLight
            position={[0, 6, 1]}
            intensity={2.5}
            color="#fffbeb"
            angle={0.4}
            penumbra={1}
            castShadow
          />

          {/* Floating 3D Chicken & Spices with Scroll Reaction */}
          <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.3}>
            <GoldenChicken3D scrollProgress={scrollProgress} />
          </Float>

          {/* Post Processing: Warm Golden Bloom and Cinematic Vignette */}
          <EffectComposer multisampling={4}>
            <Bloom
              luminanceThreshold={0.55}
              luminanceSmoothing={0.85}
              intensity={0.6}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.2} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};
