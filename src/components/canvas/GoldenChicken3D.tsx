import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Center } from '@react-three/drei';
import * as THREE from 'three';

interface GoldenChicken3DProps {
  scrollProgress: number;
}

const CHICKEN_URL = `${import.meta.env.BASE_URL}models/chicken.glb`;
const PLATE_URL = `${import.meta.env.BASE_URL}models/plate.glb`;
const CHILI_URL = `${import.meta.env.BASE_URL}models/chili.glb`;
const LEMON_URL = `${import.meta.env.BASE_URL}models/lemon.glb`;
const TOMATO_URL = `${import.meta.env.BASE_URL}models/tomato.glb`;
const SMOKE_TEX_URL = `${import.meta.env.BASE_URL}textures/smoke.png`;

export const GoldenChicken3D: React.FC<GoldenChicken3DProps> = ({ scrollProgress }) => {
  const mainGroup = useRef<THREE.Group>(null);
  const garnishGroup = useRef<THREE.Group>(null);
  const steamGroup = useRef<THREE.Group>(null);
  const sparksGroup = useRef<THREE.Points>(null);

  // 1. Load real scanned 3D models
  const chickenGltf = useGLTF(CHICKEN_URL);
  const plateGltf = useGLTF(PLATE_URL);
  const chiliGltf = useGLTF(CHILI_URL);
  const lemonGltf = useGLTF(LEMON_URL);
  const tomatoGltf = useGLTF(TOMATO_URL);

  // 2. Load realistic photographic smoke/steam texture
  const smokeTexture = useTexture(SMOKE_TEX_URL);

  // Enhance Chicken with crisp golden roasted PBR reflections
  const chickenScene = useMemo(() => {
    const cloned = chickenGltf.scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.32;
          mat.metalness = 0.15;
          mat.emissive = new THREE.Color('#381302');
          mat.emissiveIntensity = 0.28;
        }
      }
    });
    return cloned;
  }, [chickenGltf]);

  // Real 3D Plate with luxury obsidian & gold trim
  const plateScene = useMemo(() => {
    const cloned = plateGltf.scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#121218',
          roughness: 0.15,
          metalness: 0.85,
        });
      }
    });
    return cloned;
  }, [plateGltf]);

  // Real 3D Garnishes
  const chiliScene1 = useMemo(() => {
    const c = chiliGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) child.castShadow = true;
    });
    return c;
  }, [chiliGltf]);

  const chiliScene2 = useMemo(() => {
    const c = chiliGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) child.castShadow = true;
    });
    return c;
  }, [chiliGltf]);

  const lemonScene = useMemo(() => {
    const c = lemonGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) child.castShadow = true;
    });
    return c;
  }, [lemonGltf]);

  const tomatoScene1 = useMemo(() => {
    const c = tomatoGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) child.castShadow = true;
    });
    return c;
  }, [tomatoGltf]);

  const tomatoScene2 = useMemo(() => {
    const c = tomatoGltf.scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) child.castShadow = true;
    });
    return c;
  }, [tomatoGltf]);

  // Photographic Steam/Smoke Particle Data
  const steamPuffs = useMemo(() => {
    const list = [];
    for (let i = 0; i < 24; i++) {
      list.push({
        x: (Math.random() - 0.5) * 1.2,
        y: 0.3 + Math.random() * 2.8,
        z: (Math.random() - 0.5) * 1.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.4,
        scale: 0.8 + Math.random() * 0.9,
        speed: 0.6 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  // Golden glowing embers
  const sparksGeo = useMemo(() => {
    const count = 130;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.8 + Math.random() * 3.4;
      const y = -1 + Math.random() * 4.4;
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
      let targetY = -0.35;
      let targetZ = 0;
      let targetRotY = t * 0.32;
      let targetRotX = 0.12;
      // Prominent, majestic large scale
      let targetScale = 1.95;

      if (p < 0.25) {
        // Hero
        const sub = p / 0.25;
        targetX = THREE.MathUtils.lerp(0, 1.45, sub);
        targetY = THREE.MathUtils.lerp(-0.35, -0.15, sub);
        targetScale = THREE.MathUtils.lerp(1.95, 2.25, sub);
        targetRotY += sub * 1.4;
      } else if (p < 0.6) {
        // Story & Craft
        const sub = (p - 0.25) / 0.35;
        targetX = THREE.MathUtils.lerp(1.45, -1.6, sub);
        targetY = THREE.MathUtils.lerp(-0.15, 0.2, sub);
        targetRotX = 0.25;
        targetRotY += 1.4 + sub * 2.2;
        targetScale = THREE.MathUtils.lerp(2.25, 1.8, sub);
      } else {
        // Menu & Delivery
        const sub = Math.min(1, (p - 0.6) / 0.4);
        targetX = THREE.MathUtils.lerp(-1.6, 1.7, sub);
        targetY = THREE.MathUtils.lerp(0.2, -0.4, sub);
        targetRotX = 0.12;
        targetRotY += 3.6 + sub * 1.8;
        targetScale = THREE.MathUtils.lerp(1.8, 1.55, sub);
      }

      mainGroup.current.position.x = THREE.MathUtils.lerp(mainGroup.current.position.x, targetX, 0.08);
      mainGroup.current.position.y = THREE.MathUtils.lerp(mainGroup.current.position.y, targetY + Math.sin(t * 1.4) * 0.08, 0.08);
      mainGroup.current.position.z = THREE.MathUtils.lerp(mainGroup.current.position.z, targetZ, 0.08);

      mainGroup.current.rotation.y = THREE.MathUtils.lerp(mainGroup.current.rotation.y, targetRotY, 0.08);
      mainGroup.current.rotation.x = THREE.MathUtils.lerp(mainGroup.current.rotation.x, targetRotX + Math.cos(t) * 0.04, 0.08);

      const s = THREE.MathUtils.lerp(mainGroup.current.scale.x, targetScale, 0.08);
      mainGroup.current.scale.set(s, s, s);
    }

    // Orbiting Garnishes
    if (garnishGroup.current) {
      garnishGroup.current.rotation.y = -t * 0.18;
    }

    // Realistic Whisps of Steam (rising, rotating, billowing)
    if (steamGroup.current) {
      steamGroup.current.children.forEach((child, i) => {
        const p = steamPuffs[i];
        if (p) {
          child.position.y += delta * 0.5 * p.speed;
          child.position.x = p.x + Math.sin(t * 1.2 + p.offset) * 0.18;
          child.position.z = p.z + Math.cos(t * 1.2 + p.offset) * 0.18;
          child.rotation.z += delta * p.rotSpeed;

          // Billow expansion as it rises
          const heightRatio = Math.max(0, Math.min(1, (child.position.y - 0.3) / 2.8));
          const currentScale = p.scale * (1 + heightRatio * 0.8);
          child.scale.set(currentScale, currentScale, currentScale);

          // Reset when reaching top
          if (child.position.y > 3.2) {
            child.position.y = 0.3;
          }
        }
      });
    }

    if (sparksGroup.current) {
      sparksGroup.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={mainGroup} position={[0, -0.35, 0]}>
      {/* 1. Real Scanned 3D Serving Plate */}
      <group position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
        <Center>
          <primitive object={plateScene} scale={18.5} />
        </Center>
      </group>

      {/* 2. Scaled Up Photorealistic Golden Chicken */}
      <group position={[0, 0.3, 0]}>
        <Center top>
          <primitive object={chickenScene} scale={1.6} />
        </Center>
      </group>

      {/* 3. Orbiting Real 3D Garnishes */}
      <group ref={garnishGroup}>
        {/* Real 3D Red Chili Pepper 1 */}
        <group position={[2.2, 0.5, 0.8]} rotation={[0.4, 0.6, -0.3]}>
          <Center>
            <primitive object={chiliScene1} scale={0.42} />
          </Center>
        </group>

        {/* Real 3D Red Chili Pepper 2 */}
        <group position={[-2.3, -0.1, -0.9]} rotation={[-0.5, 1.2, 0.6]}>
          <Center>
            <primitive object={chiliScene2} scale={0.36} />
          </Center>
        </group>

        {/* Real 3D Fresh Sliced Citrus Lemon */}
        <group position={[-2.0, 0.8, 1.2]} rotation={[0.8, -0.4, 0.5]}>
          <Center>
            <primitive object={lemonScene} scale={0.12} />
          </Center>
        </group>

        {/* Real 3D Cherry Tomato 1 */}
        <group position={[1.9, -0.25, -1.1]} rotation={[0.2, 0.8, 0]}>
          <Center>
            <primitive object={tomatoScene1} scale={0.007} />
          </Center>
        </group>

        {/* Real 3D Cherry Tomato 2 */}
        <group position={[0.4, 1.4, -1.8]} rotation={[-0.3, 0.2, 0.4]}>
          <Center>
            <primitive object={tomatoScene2} scale={0.006} />
          </Center>
        </group>
      </group>

      {/* 4. Realistic Photographic Steam Billows */}
      <group ref={steamGroup}>
        {steamPuffs.map((p, idx) => (
          <mesh key={idx} position={[p.x, p.y, p.z]} scale={p.scale}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshStandardMaterial
              map={smokeTexture}
              transparent
              opacity={0.18}
              roughness={1}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
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

// Preload assets for instant display
useGLTF.preload(CHICKEN_URL);
useGLTF.preload(PLATE_URL);
useGLTF.preload(CHILI_URL);
useGLTF.preload(LEMON_URL);
useGLTF.preload(TOMATO_URL);
useTexture.preload(SMOKE_TEX_URL);
