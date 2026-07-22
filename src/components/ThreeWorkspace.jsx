import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Rotating React Orbit Logo in 3D
const ReactLogo3D = (props) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.5;
    groupRef.current.rotation.x = t * 0.2;
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Central nucleus */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#E879F9" toneMapped={false} />
      </mesh>
      {/* Orbit rings */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.4, 0.015, 8, 48]} />
        <meshBasicMaterial color="#A855F7" opacity={0.6} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 3, 0]}>
        <torusGeometry args={[0.4, 0.015, 8, 48]} />
        <meshBasicMaterial color="#A855F7" opacity={0.6} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 3, Math.PI / 3, 0]}>
        <torusGeometry args={[0.4, 0.015, 8, 48]} />
        <meshBasicMaterial color="#A855F7" opacity={0.6} transparent />
      </mesh>
    </group>
  );
};

// Abstract Floating 3D Laptop model
const Laptop3D = (props) => {
  const laptopRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    laptopRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <group ref={laptopRef} {...props}>
      {/* Keyboard Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.85]} />
        <meshStandardMaterial color="#121212" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Screen Hinge + Screen */}
      <group position={[0, 0, -0.4]} rotation={[Math.PI / 4.5, 0, 0]}>
        {/* Screen back panel */}
        <mesh position={[0, 0.4, 0.025]}>
          <boxGeometry args={[1.2, 0.8, 0.04]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Glowing Screen display */}
        <mesh position={[0, 0.4, 0.05]}>
          <planeGeometry args={[1.12, 0.72]} />
          <meshBasicMaterial color="#0E0518" />
        </mesh>
        {/* Code Lines on Screen */}
        <mesh position={[-0.2, 0.4, 0.055]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial color="#E879F9" opacity={0.85} transparent />
        </mesh>
        <mesh position={[0.2, 0.5, 0.055]}>
          <planeGeometry args={[0.25, 0.1]} />
          <meshBasicMaterial color="#A855F7" opacity={0.9} transparent />
        </mesh>
        <mesh position={[0.2, 0.35, 0.055]}>
          <planeGeometry args={[0.25, 0.15]} />
          <meshBasicMaterial color="#C026D3" opacity={0.7} transparent />
        </mesh>
      </group>
    </group>
  );
};

// Holographic Floating Monitors
const HolographicMonitor = ({ position, rotation, color = "#D946EF", delay = 0 }) => {
  const monitorRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    monitorRef.current.position.y = position[2] + Math.sin(t) * 0.15;
    monitorRef.current.rotation.y = rotation[1] + Math.cos(t * 0.5) * 0.05;
  });

  return (
    <group ref={monitorRef} position={position} rotation={rotation}>
      {/* Outer border of monitor */}
      <mesh>
        <boxGeometry args={[0.9, 0.6, 0.01]} />
        <meshBasicMaterial color={color} wireframe opacity={0.3} transparent />
      </mesh>
      {/* Glow glass pane */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[0.88, 0.58]} />
        <meshBasicMaterial color={color} opacity={0.06} transparent side={THREE.DoubleSide} />
      </mesh>
      {/* Tech grid layout on screen */}
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshBasicMaterial color={color} wireframe opacity={0.25} transparent />
      </mesh>
    </group>
  );
};

// AI Pulsing Orb in the center
const AIOrb3D = (props) => {
  const orbRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Pulsating scale
    const scale = 1 + Math.sin(t * 3) * 0.08;
    orbRef.current.scale.set(scale, scale, scale);
    orbRef.current.rotation.y = t * 0.8;
  });

  return (
    <group ref={orbRef} {...props}>
      <Sphere args={[0.3, 32, 32]}>
        <meshBasicMaterial color="#D946EF" wireframe opacity={0.8} transparent />
      </Sphere>
      <Sphere args={[0.22, 16, 16]}>
        <meshBasicMaterial color="#A855F7" opacity={0.4} transparent />
      </Sphere>
    </group>
  );
};

// Floating Particles
const FloatingParticles = ({ count = 60 }) => {
  const pointsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = t * 0.01;
  });

  // Generate random positions
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#E879F9"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Combined Workspace scene inside Canvas
const WorkspaceScene = ({ mouse }) => {
  const groupRef = useRef();

  useFrame((state) => {
    // Gentle mouse interaction (parallax tilt)
    const targetX = (mouse.x - window.innerWidth / 2) * 0.0003;
    const targetY = (mouse.y - window.innerHeight / 2) * 0.0003;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#D946EF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />

      {/* Floating stars */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={1} />

      {/* Floating Particles */}
      <FloatingParticles count={80} />

      {/* Central Floating Laptop */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Laptop3D position={[0, -0.2, 0]} />
      </Float>

      {/* Holographic Monitors in backdrop */}
      <HolographicMonitor position={[-1.6, 0.5, -0.6]} rotation={[0, Math.PI / 6, 0]} color="#A855F7" delay={0} />
      <HolographicMonitor position={[1.6, 0.6, -0.6]} rotation={[0, -Math.PI / 6, 0]} color="#D946EF" delay={1.5} />

      {/* AI Pulsing Orb */}
      <Float speed={3} floatIntensity={1.2}>
        <AIOrb3D position={[0, 1.0, -0.2]} />
      </Float>

      {/* Rotating tech logos */}
      <Float speed={2} floatIntensity={1.5} rotationIntensity={1}>
        <ReactLogo3D position={[-1.2, -0.4, 0.8]} />
      </Float>
      
      {/* Node logo representation */}
      <Float speed={2.5} floatIntensity={1} rotationIntensity={1.2}>
        <mesh position={[1.3, -0.5, 0.6]}>
          <octahedronGeometry args={[0.22]} />
          <meshBasicMaterial color="#22C55E" wireframe opacity={0.8} transparent />
        </mesh>
      </Float>

      {/* Database logo representation */}
      <Float speed={1.8} floatIntensity={1.2} rotationIntensity={0.8}>
        <mesh position={[-0.8, 0.9, 0.5]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.15, 0.15, 0.4, 6]} />
          <meshBasicMaterial color="#C026D3" wireframe opacity={0.7} transparent />
        </mesh>
      </Float>
    </group>
  );
};

export default function ThreeWorkspace() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hasError, setHasError] = useState(false);

  // Monitor mouse movements for tilt parallax
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (hasError) {
    // Elegant fallback UI if WebGL fails
    return (
      <div className="w-full h-[400px] flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purplePrimary/10 to-purpleGlow/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="relative glass-panel rounded-2xl p-6 max-w-sm text-center border-purplePrimary/30">
          <div className="w-16 h-16 rounded-full bg-purplePrimary/15 flex items-center justify-center mx-auto mb-4 border border-purpleAccent/50">
            <span className="text-2xl animate-ping">⚡</span>
          </div>
          <h3 className="font-outfit text-xl font-bold mb-2">Workspace Engine Live</h3>
          <p className="text-sm text-textMuted leading-relaxed">
            Running in light overlay mode. Hover to explore connected AI architectures.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] lg:h-[500px] relative select-none">
      {/* Glowing Mesh mesh backing */}
      <div className="absolute inset-0 bg-radial-at-c from-purplePrimary/10 to-transparent pointer-events-none blur-3xl"></div>
      
      <Canvas
        camera={{ position: [0, 0.5, 3.2], fov: 45 }}
        onError={() => setHasError(true)}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <WorkspaceScene mouse={mouse} />
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
