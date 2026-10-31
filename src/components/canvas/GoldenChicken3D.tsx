import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface GoldenChicken3DProps {
  scrollProgress: number;
}

const CHICKEN_URL = `${import.meta.env.BASE_URL}models/chicken.glb`;
const CHILI_URL = `${import.meta.env.BASE_URL}models/chili.glb`;
const LEMON_URL = `${import.meta.env.BASE_URL}models/lemon.glb`;
const TOMATO_URL = `${import.meta.env.BASE_URL}models/tomato.glb`;

export const GoldenChicken3D: React.FC<GoldenChicken3DProps> = ({ scrollProgress }) => {
  const mainGroup = useRef<THREE.Group>(null);
  const garnishGroup = useRef<THREE.Group>(null);
  const steamGroup = useRef<THREE.Group>(null);
  const sparksGroup = useRef<THREE.Points>(null);

  // Load realistic 3D scanned models
  const chickenGltf = useGLTF(CHICKEN_URL);
  const chiliGltf = useGLTF(CHILI_URL);
  const lemonGltf = useGLTF(LEMON_URL);
  const tomatoGltf = useGLTF(TOMATO_URL);

  // Enhance Chicken with crisp golden roasted warmth
  const chickenScene = useMemo(() => {
    const cloned = chickenGltf.scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.35;
          mat.metalness = 0.12;
          mat.emissive = new THREE.Color('#3d1502');
          mat.emissiveIntensity = 0.25;
        }
      }
    });
    return cloned;
  }, [chickenGltf]);

  // Clone garnish elements with shadows
  const chiliScene1 = useMemo(() => {
    const c = chiliGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
      }
    });
    return c;
  }, [chiliGltf]);

  const chiliScene2 = useMemo(() => {
    const c = chiliGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
      }
    });
    return c;
  }, [chiliGltf]);

  const lemonScene = useMemo(() => {
    const c = lemonGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
      }
    });
    return c;
  }, [lemonGltf]);

  const tomatoScene1 = useMemo(() => {
    const c = tomatoGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
      }
    });
    return c;
  }, [tomatoGltf]);

  const tomatoScene2 = useMemo(() => {
    const c = tomatoGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
      }
    });
    return c;
  }, [tomatoGltf]);

  // Luxury Obsidian Platter
  const plateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0a0a0f',
      roughness: 0.18,
      metalness: 0.85,
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

  // Rising steam puffs
  const steamParticles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        x: (Math.random() - 0.5) * 1.4,
        y: Math.random() * 2.8,
        z: (Math.random() - 0.5) * 1.4,
        scale: 0.18 + Math.random() * 0.4,
        speed: 0.8 + Math.random() * 1.2,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  // Golden glowing embers
  const sparksGeo = useMemo(() => {
    const count = 140;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 3.2;
      const y = -1 + Math.random() * 4.2;
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
      let targetY = -0.3;
      let targetZ = 0;
      let targetRotY = t * 0.32;
      let targetRotX = 0.12;
      // Enlarged base scale for grand heroic appearance
      let targetScale = 1.85;

      if (p < 0.25) {
        // Hero
        const sub = p / 0.25;
        targetX = THREE.MathUtils.lerp(0, 1.4, sub);
        targetY = THREE.MathUtils.lerp(-0.3, -0.15, sub);
        targetScale = THREE.MathUtils.lerp(1.85, 2.1, sub);
        targetRotY += sub * 1.4;
      } else if (p < 0.6) {
        // Story & Craft
        const sub = (p - 0.25) / 0.35;
        targetX = THREE.MathUtils.lerp(1.4, -1.5, sub);
        targetY = THREE.MathUtils.lerp(-0.15, 0.2, sub);
        targetRotX = 0.25;
        targetRotY += 1.4 + sub * 2.2;
        targetScale = THREE.MathUtils.lerp(2.1, 1.7, sub);
      } else {
        // Menu & Delivery
        const sub = Math.min(1, (p - 0.6) / 0.4);
        targetX = THREE.MathUtils.lerp(-1.5, 1.6, sub);
        targetY = THREE.MathUtils.lerp(0.2, -0.4, sub);
        targetRotX = 0.12;
        targetRotY += 3.6 + sub * 1.8;
        targetScale = THREE.MathUtils.lerp(1.7, 1.5, sub);
      }

      mainGroup.current.position.x = THREE.MathUtils.lerp(mainGroup.current.position.x, targetX, 0.08);
      mainGroup.current.position.y = THREE.MathUtils.lerp(mainGroup.current.position.y, targetY + Math.sin(t * 1.4) * 0.09, 0.08);
      mainGroup.current.position.z = THREE.MathUtils.lerp(mainGroup.current.position.z, targetZ, 0.08);

      mainGroup.current.rotation.y = THREE.MathUtils.lerp(mainGroup.current.rotation.y, targetRotY, 0.08);
      mainGroup.current.rotation.x = THREE.MathUtils.lerp(mainGroup.current.rotation.x, targetRotX + Math.cos(t) * 0.04, 0.08);

      const s = THREE.MathUtils.lerp(mainGroup.current.scale.x, targetScale, 0.08);
      mainGroup.current.scale.set(s, s, s);
    }

    // Animate orbiting 3D real garnish models
    if (garnishGroup.current) {
      garnishGroup.current.rotation.y = -t * 0.18;
    }

    // Animate steam puffs
    if (steamGroup.current) {
      steamGroup.current.children.forEach((child, i) => {
        const p = steamParticles[i];
        if (p) {
          child.position.y += delta * 0.45 * p.speed;
          child.position.x = p.x + Math.sin(t * 1.6 + p.offset) * 0.2;
          child.position.z = p.z + Math.cos(t * 1.6 + p.offset) * 0.2;
          if (child.position.y > 3.0) {
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
    <group ref={mainGroup} position={[0, -0.3, 0]}>
      {/* 1. Large Luxury Platter */}
      <mesh position={[0, -0.5, 0]} material={plateMaterial} receiveShadow>
        <cylinderGeometry args={[2.7, 2.2, 0.08, 48]} />
      </mesh>
      <mesh position={[0, -0.46, 0]} material={goldRimMaterial}>
        <torusGeometry args={[2.7, 0.035, 16, 48]} />
      </mesh>

      {/* 2. Scaled Up Photorealistic Golden Chicken */}
      <group position={[0, 0.25, 0]}>
        <Center top>
          <primitive object={chickenScene} scale={1.5} />
        </Center>
      </group>

      {/* 3. Orbiting Real 3D Garnishes (Chili, Lemon, Tomato) */}
      <group ref={garnishGroup}>
        {/* Floating Red Chili Pepper 1 */}
        <group position={[2.1, 0.5, 0.8]} rotation={[0.4, 0.6, -0.3]}>
          <Center>
            <primitive object={chiliScene1} scale={0.42} />
          </Center>
        </group>

        {/* Floating Red Chili Pepper 2 (Opposite side) */}
        <group position={[-2.2, -0.1, -0.9]} rotation={[-0.5, 1.2, 0.6]}>
          <Center>
            <primitive object={chiliScene2} scale={0.36} />
          </Center>
        </group>

        {/* Floating Fresh Sliced Citrus Lemon */}
        <group position={[-1.9, 0.8, 1.2]} rotation={[0.8, -0.4, 0.5]}>
          <Center>
            <primitive object={lemonScene} scale={0.12} />
          </Center>
        </group>

        {/* Platter Cherry Tomato 1 */}
        <group position={[1.8, -0.25, -1.1]} rotation={[0.2, 0.8, 0]}>
          <Center>
            <primitive object={tomatoScene1} scale={0.007} />
          </Center>
        </group>

        {/* Floating Cherry Tomato 2 */}
        <group position={[0.4, 1.4, -1.8]} rotation={[-0.3, 0.2, 0.4]}>
          <Center>
            <primitive object={tomatoScene2} scale={0.006} />
          </Center>
        </group>
      </group>

      {/* 4. Rising Steam Particles */}
      <group ref={steamGroup}>
        {steamParticles.map((p, idx) => (
          <mesh key={idx} position={[p.x, p.y, p.z]} scale={p.scale}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshStandardMaterial
              color="#fff0e0"
              transparent
              opacity={0.13}
              roughness={1}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* 5. Golden Glowing Embers */}
      <points ref={sparksGroup} geometry={sparksGeo}>
        <pointsMaterial
          size={0.038}
          color="#f59e0b"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

// Preload models for instantaneous display
useGLTF.preload(CHICKEN_URL);
useGLTF.preload(CHILI_URL);
useGLTF.preload(LEMON_URL);
useGLTF.preload(TOMATO_URL);
