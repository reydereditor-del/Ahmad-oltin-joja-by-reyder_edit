import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GoldenChicken3DProps {
  scrollProgress: number;
}

export const GoldenChicken3D: React.FC<GoldenChicken3DProps> = ({ scrollProgress }) => {
  const mainGroup = useRef<THREE.Group>(null);
  const chickenGroup = useRef<THREE.Group>(null);
  const steamGroup = useRef<THREE.Group>(null);
  const spicesGroup = useRef<THREE.Group>(null);
  const sparksGroup = useRef<THREE.Points>(null);

  // Generate procedural crispy golden chicken skin texture
  const { skinTexture, bumpTexture } = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const bumpCanvas = document.createElement('canvas');
    bumpCanvas.width = 512;
    bumpCanvas.height = 512;
    const bCtx = bumpCanvas.getContext('2d');

    if (ctx && bCtx) {
      // Base golden roasted gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#f97316'); // rich golden amber
      grad.addColorStop(0.3, '#d97706'); // crisp brown
      grad.addColorStop(0.6, '#b45309'); // deep roasted crust
      grad.addColorStop(0.9, '#92400e'); // caramelized edge
      grad.addColorStop(1, '#f59e0b'); // glistening honey highlight
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Add crispy speckles & pepper crust
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const r = Math.random() * 2.5 + 0.5;
        const brightness = Math.random();

        ctx.fillStyle = brightness > 0.6 
          ? `rgba(255, 235, 150, ${Math.random() * 0.4})` 
          : `rgba(45, 18, 5, ${Math.random() * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Bump map equivalent
        bCtx.fillStyle = `rgb(${brightness * 255}, ${brightness * 255}, ${brightness * 255})`;
        bCtx.beginPath();
        bCtx.arc(x, y, r, 0, Math.PI * 2);
        bCtx.fill();
      }
    }

    const skinTex = new THREE.CanvasTexture(canvas);
    skinTex.wrapS = skinTex.wrapT = THREE.RepeatWrapping;
    skinTex.repeat.set(2, 2);

    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    bumpTex.wrapS = bumpTex.wrapT = THREE.RepeatWrapping;
    bumpTex.repeat.set(2, 2);

    return { skinTexture: skinTex, bumpTexture: bumpTex };
  }, []);

  // Material for the Roasted Golden Chicken
  const chickenMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: skinTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.08,
      roughness: 0.32,
      metalness: 0.18,
      emissive: new THREE.Color('#3d1602'),
      emissiveIntensity: 0.25,
    });
  }, [skinTexture, bumpTexture]);

  // Golden Plate Material
  const plateMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0d0d12',
      roughness: 0.2,
      metalness: 0.85,
    });
  }, []);

  const goldRimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f59e0b',
      roughness: 0.15,
      metalness: 0.95,
      emissive: new THREE.Color('#78350f'),
      emissiveIntensity: 0.4,
    });
  }, []);

  // Floating spices data (Zira, bay leaves, chili seeds, peppercorn)
  const spices = useMemo(() => {
    const list = [];
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 1.5;
      const height = (Math.random() - 0.5) * 2.2;
      const speed = 0.5 + Math.random() * 0.8;
      const scale = 0.08 + Math.random() * 0.09;
      const type = i % 3; // 0: leaf, 1: peppercorn, 2: chili flake
      list.push({ angle, radius, height, speed, scale, type, initialY: height });
    }
    return list;
  }, []);

  // Rising steam puffs data
  const steamParticles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 35; i++) {
      list.push({
        x: (Math.random() - 0.5) * 0.9,
        y: Math.random() * 2.2,
        z: (Math.random() - 0.5) * 0.9,
        scale: 0.15 + Math.random() * 0.35,
        speed: 0.8 + Math.random() * 1.2,
        opacity: Math.random() * 0.35,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return list;
  }, []);

  // Golden glowing sparks (Embers)
  const sparksGeo = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 0.6 + Math.random() * 2.5;
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
      // Cinematic Camera Choreography via Scroll:
      // Hero (0 - 0.25): Center, large, proud
      // Story (0.25 - 0.55): Shifts to right, zooms in to show golden skin details & spices
      // Menu (0.55 - 0.8): Shifts to left, tilts upward
      // Footer (0.8 - 1.0): Floats softly with golden glow

      const p = scrollProgress;
      let targetX = 0;
      let targetY = -0.2;
      let targetZ = 0;
      let targetRotY = t * 0.35;
      let targetRotX = 0.2;
      let targetScale = 1.35;

      if (p < 0.25) {
        // Hero
        const sub = p / 0.25;
        targetX = THREE.MathUtils.lerp(0, 1.2, sub);
        targetY = THREE.MathUtils.lerp(-0.2, -0.1, sub);
        targetScale = THREE.MathUtils.lerp(1.35, 1.5, sub);
        targetRotY += sub * 1.5;
      } else if (p < 0.6) {
        // Story / Spices
        const sub = (p - 0.25) / 0.35;
        targetX = THREE.MathUtils.lerp(1.2, -1.3, sub);
        targetY = THREE.MathUtils.lerp(-0.1, 0.2, sub);
        targetRotX = 0.35;
        targetRotY += 1.5 + sub * 2.2;
        targetScale = THREE.MathUtils.lerp(1.5, 1.25, sub);
      } else {
        // Menu & Delivery
        const sub = Math.min(1, (p - 0.6) / 0.4);
        targetX = THREE.MathUtils.lerp(-1.3, 1.5, sub);
        targetY = THREE.MathUtils.lerp(0.2, -0.4, sub);
        targetRotX = 0.15;
        targetRotY += 3.7 + sub * 1.8;
        targetScale = THREE.MathUtils.lerp(1.25, 1.15, sub);
      }

      // Smooth dampening
      mainGroup.current.position.x = THREE.MathUtils.lerp(mainGroup.current.position.x, targetX, 0.08);
      mainGroup.current.position.y = THREE.MathUtils.lerp(mainGroup.current.position.y, targetY + Math.sin(t * 1.5) * 0.08, 0.08);
      mainGroup.current.position.z = THREE.MathUtils.lerp(mainGroup.current.position.z, targetZ, 0.08);

      mainGroup.current.rotation.y = THREE.MathUtils.lerp(mainGroup.current.rotation.y, targetRotY, 0.08);
      mainGroup.current.rotation.x = THREE.MathUtils.lerp(mainGroup.current.rotation.x, targetRotX + Math.cos(t) * 0.05, 0.08);

      const s = THREE.MathUtils.lerp(mainGroup.current.scale.x, targetScale, 0.08);
      mainGroup.current.scale.set(s, s, s);
    }

    // Animate Spices rotation & dispersion
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

    // Animate Steam
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

    // Animate Sparks
    if (sparksGroup.current) {
      sparksGroup.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={mainGroup} position={[0, -0.2, 0]}>
      {/* 1. Golden Serving Platter */}
      <mesh position={[0, -0.55, 0]} material={plateMaterial} receiveShadow>
        <cylinderGeometry args={[2.2, 1.8, 0.1, 48]} />
      </mesh>
      {/* Golden Platter Rim */}
      <mesh position={[0, -0.5, 0]} material={goldRimMaterial}>
        <torusGeometry args={[2.2, 0.04, 16, 48]} />
      </mesh>

      {/* 2. Anatomical Roast Chicken Group */}
      <group ref={chickenGroup} position={[0, 0, 0]}>
        {/* Main Plump Body (Torso) */}
        <mesh position={[0, 0, 0]} material={chickenMaterial} castShadow>
          <sphereGeometry args={[0.9, 36, 36]} />
        </mesh>
        
        {/* Upper Breast Layer (Full golden breast) */}
        <mesh position={[0, 0.25, 0.25]} rotation={[0.4, 0, 0]} material={chickenMaterial} castShadow>
          <capsuleGeometry args={[0.55, 0.55, 24, 24]} />
        </mesh>

        {/* Back Tail & Crispy Crest */}
        <mesh position={[0, 0.1, -0.6]} rotation={[-0.5, 0, 0]} material={chickenMaterial} castShadow>
          <coneGeometry args={[0.45, 0.65, 24]} />
        </mesh>

        {/* Left Roasted Drumstick & Thigh */}
        <group position={[0.7, -0.1, 0.2]} rotation={[0.3, 0.4, -0.5]}>
          <mesh material={chickenMaterial} castShadow>
            <capsuleGeometry args={[0.38, 0.6, 20, 20]} />
          </mesh>
          {/* Drumstick bone tip wrapped in golden parchment */}
          <mesh position={[0, -0.55, 0]} material={goldRimMaterial}>
            <cylinderGeometry args={[0.07, 0.08, 0.35, 16]} />
          </mesh>
        </group>

        {/* Right Roasted Drumstick & Thigh */}
        <group position={[-0.7, -0.1, 0.2]} rotation={[0.3, -0.4, 0.5]}>
          <mesh material={chickenMaterial} castShadow>
            <capsuleGeometry args={[0.38, 0.6, 20, 20]} />
          </mesh>
          {/* Drumstick bone tip wrapped in golden parchment */}
          <mesh position={[0, -0.55, 0]} material={goldRimMaterial}>
            <cylinderGeometry args={[0.07, 0.08, 0.35, 16]} />
          </mesh>
        </group>

        {/* Left Wing (Crispy Tuck) */}
        <mesh position={[0.75, 0.1, -0.2]} rotation={[0.5, 0.2, -0.7]} material={chickenMaterial} castShadow>
          <capsuleGeometry args={[0.22, 0.7, 16, 16]} />
        </mesh>

        {/* Right Wing (Crispy Tuck) */}
        <mesh position={[-0.75, 0.1, -0.2]} rotation={[0.5, -0.2, 0.7]} material={chickenMaterial} castShadow>
          <capsuleGeometry args={[0.22, 0.7, 16, 16]} />
        </mesh>

        {/* Golden Glisten Halo Accent inside */}
        <pointLight position={[0, 0.4, 0]} color="#f59e0b" intensity={2.5} distance={2.5} />
      </group>

      {/* 3. Floating Cinematic Spices Group */}
      <group ref={spicesGroup}>
        {spices.map((s, idx) => {
          const posX = Math.cos(s.angle) * s.radius;
          const posZ = Math.sin(s.angle) * s.radius;
          return (
            <group key={idx} position={[posX, s.height, posZ]} scale={s.scale}>
              {s.type === 0 ? (
                // Golden Bay Leaf
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
                // Roasted Peppercorn
                <mesh>
                  <dodecahedronGeometry args={[0.35, 1]} />
                  <meshStandardMaterial color="#1c1917" roughness={0.9} />
                </mesh>
              ) : (
                // Zira / Golden Seed
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

      {/* 5. Golden Glowing Embers / Sparks */}
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
