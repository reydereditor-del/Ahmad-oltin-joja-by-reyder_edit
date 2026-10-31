import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface GoldenChicken3DProps {
  scrollProgress: number;
}

const MODEL_PATH = `${import.meta.env.BASE_URL}models/chicken.glb`;

export const GoldenChicken3D: React.FC<GoldenChicken3DProps> = ({ scrollProgress }) => {
  const mainGroup = useRef<THREE.Group>(null);
  const steamGroup = useRef<THREE.Group>(null);
  const spicesGroup = useRef<THREE.Group>(null);
  const sparksGroup = useRef<THREE.Points>(null);

  // Load the realistic 3D scanned roast chicken model
  const { scene } = useGLTF(MODEL_PATH);

  // Enhance the materials with a rich golden crispy roast sheen
  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          // If standard or physical material, enrich specular & warmth
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => enhanceMaterial(mat));
          } else {
            enhanceMaterial(mesh.material);
          }
        }
      }
    });
    return cloned;
  }, [scene]);

  function enhanceMaterial(mat: THREE.Material) {
    if ('roughness' in mat) {
      (mat as THREE.MeshStandardMaterial).roughness = 0.38;
      (mat as THREE.MeshStandardMaterial).metalness = 0.12;
      // Warm golden emissive accent
      (mat as THREE.MeshStandardMaterial).emissive = new THREE.Color('#381302');
      (mat as THREE.MeshStandardMaterial).emissiveIntensity = 0.22;
    }
  }

  // Golden Serving Platter Material
  const plateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0d0d12',
      roughness: 0.15,
      metalness: 0.88,
    });
  }, []);

  const goldRimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      roughness: 0.12,
      metalness: 0.96,
      emissive: new THREE.Color('#78350f'),
      emissiveIntensity: 0.45,
    });
  }, []);

  // Floating spices data
  const spices = useMemo(() => {
    const list = [];
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const radius = 1.9 + Math.random() * 1.6;
      const height = (Math.random() - 0.5) * 2.2;
      const speed = 0.5 + Math.random() * 0.8;
      const scale = 0.08 + Math.random() * 0.09;
      const type = i % 3;
      list.push({ angle, radius, height, speed, scale, type, initialY: height });
    }
    return list;
  }, []);

  // Rising steam puffs
  const steamParticles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 35; i++) {
      list.push({
        x: (Math.random() - 0.5) * 1.0,
        y: Math.random() * 2.2,
        z: (Math.random() - 0.5) * 1.0,
        scale: 0.15 + Math.random() * 0.35,
        speed: 0.8 + Math.random() * 1.2,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  // Golden glowing embers
  const sparksGeo = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.6 + Math.random() * 2.8;
      const y = -1 + Math.random() * 3.5;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (mainGroup.current) {
      const p = scrollProgress;
      let targetX = 0;
      let targetY = -0.2;
      let targetZ = 0;
      let targetRotY = t * 0.35;
      let targetRotX = 0.15;
      let targetScale = 1.25;

      if (p < 0.25) {
        // Hero section
        const sub = p / 0.25;
        targetX = THREE.MathUtils.lerp(0, 1.2, sub);
        targetY = THREE.MathUtils.lerp(-0.2, -0.1, sub);
        targetScale = THREE.MathUtils.lerp(1.25, 1.45, sub);
        targetRotY += sub * 1.5;
      } else if (p < 0.6) {
        // Story section
        const sub = (p - 0.25) / 0.35;
        targetX = THREE.MathUtils.lerp(1.2, -1.3, sub);
        targetY = THREE.MathUtils.lerp(-0.1, 0.2, sub);
        targetRotX = 0.3;
        targetRotY += 1.5 + sub * 2.2;
        targetScale = THREE.MathUtils.lerp(1.45, 1.15, sub);
      } else {
        // Menu & Delivery
        const sub = Math.min(1, (p - 0.6) / 0.4);
        targetX = THREE.MathUtils.lerp(-1.3, 1.5, sub);
        targetY = THREE.MathUtils.lerp(0.2, -0.4, sub);
        targetRotX = 0.15;
        targetRotY += 3.7 + sub * 1.8;
        targetScale = THREE.MathUtils.lerp(1.15, 1.05, sub);
      }

      mainGroup.current.position.x = THREE.MathUtils.lerp(mainGroup.current.position.x, targetX, 0.08);
      mainGroup.current.position.y = THREE.MathUtils.lerp(mainGroup.current.position.y, targetY + Math.sin(t * 1.5) * 0.08, 0.08);
      mainGroup.current.position.z = THREE.MathUtils.lerp(mainGroup.current.position.z, targetZ, 0.08);

      mainGroup.current.rotation.y = THREE.MathUtils.lerp(mainGroup.current.rotation.y, targetRotY, 0.08);
      mainGroup.current.rotation.x = THREE.MathUtils.lerp(mainGroup.current.rotation.x, targetRotX + Math.cos(t) * 0.05, 0.08);

      const s = THREE.MathUtils.lerp(mainGroup.current.scale.x, targetScale, 0.08);
      mainGroup.current.scale.set(s, s, s);
    }

    if (spicesGroup.current) {
      spicesGroup.current.rotation.y = -t * 0.2;
      spicesGroup.current.children.forEach((child, i) => {
        const item = spices[i];
        if (item) {
          child.position.y = item.initialY + Math.sin(t * item.speed + item.angle) * 0.25;
          child.rotation.x += delta * 1.2;
          child.rotation.z += delta * 0.8;
        }
      });
    }

    if (steamGroup.current) {
      steamGroup.current.children.forEach((child, i) => {
        const p = steamParticles[i];
        if (p) {
          child.position.y += delta * 0.4 * p.speed;
          child.position.x = p.x + Math.sin(t * 1.5 + p.offset) * 0.15;
          child.position.z = p.z + Math.cos(t * 1.5 + p.offset) * 0.15;
          if (child.position.y > 2.4) {
            child.position.y = 0.2;
          }
        }
      });
    }

    if (sparksGroup.current) {
      sparksGroup.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={mainGroup} position={[0, -0.2, 0]}>
      {/* 1. Golden Luxury Serving Platter */}
      <mesh position={[0, -0.4, 0]} material={plateMaterial} receiveShadow>
        <cylinderGeometry args={[2.2, 1.8, 0.08, 48]} />
      </mesh>
      <mesh position={[0, -0.36, 0]} material={goldRimMaterial}>
        <torusGeometry args={[2.2, 0.035, 16, 48]} />
      </mesh>

      {/* 2. Scanned Realistic Roast Chicken 3D Model */}
      <group position={[0, 0.2, 0]}>
        <Center top>
          <primitive object={clonedScene} scale={0.9} />
        </Center>
      </group>

      {/* 3. Floating Cinematic Spices */}
      <group ref={spicesGroup}>
        {spices.map((s, idx) => {
          const posX = Math.cos(s.angle) * s.radius;
          const posZ = Math.sin(s.angle) * s.radius;
          return (
            <group key={idx} position={[posX, s.height, posZ]} scale={s.scale}>
              {s.type === 0 ? (
                <mesh>
                  <coneGeometry args={[0.4, 1.2, 3]} />
                  <meshStandardMaterial
                    color="#eab308"
                    roughness={0.4}
                    metalness={0.6}
                    emissive="#854d0e"
                    emissiveIntensity={0.3}
                  />
                </mesh>
              ) : s.type === 1 ? (
                <mesh>
                  <dodecahedronGeometry args={[0.35, 1]} />
                  <meshStandardMaterial color="#1c1917" roughness={0.9} />
                </mesh>
              ) : (
                <mesh rotation={[0.5, 0.5, 0]}>
                  <capsuleGeometry args={[0.15, 0.6, 8, 8]} />
                  <meshStandardMaterial
                    color="#f59e0b"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#b45309"
                    emissiveIntensity={0.5}
                  />
                </mesh>
              )}
            </group>
          );
        })}
      </group>

      {/* 4. Rising Steam Particles */}
      <group ref={steamGroup}>
        {steamParticles.map((p, idx) => (
          <mesh key={idx} position={[p.x, p.y, p.z]} scale={p.scale}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial
              color="#ffeedd"
              transparent
              opacity={0.12}
              roughness={1}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* 5. Golden Glowing Embers */}
      <points ref={sparksGroup} geometry={sparksGeo}>
        <pointsMaterial
          size={0.035}
          color="#f59e0b"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Preload model
useGLTF.preload(MODEL_PATH);
