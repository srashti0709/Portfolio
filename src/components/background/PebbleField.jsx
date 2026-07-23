import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createPebbleGeometry } from "./pebbleGeometry";

// Neon purple palette from the brief
const COLORS = ["#8B5CF6", "#A855F7", "#C084FC"];

const GEOMETRY_VARIANTS = 8; // shared/reused geometries for performance
const PEBBLE_COUNT = 90; // bumped up from the original 30-50 band per request

function randRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Renders the floating pebble field and drives all per-frame motion
 * (floating drift, slow 3-axis rotation, and gentle mouse parallax)
 * from a single useFrame loop rather than one hook per mesh, which
 * keeps 40 objects comfortably inside a 60fps budget.
 */
export default function PebbleField({ reducedMotion }) {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  const { viewport } = useThree();

  const geometries = useMemo(
    () =>
      Array.from({ length: GEOMETRY_VARIANTS }, (_, i) =>
        createPebbleGeometry(i * 97 + 13, 1, 0.3)
      ),
    []
  );

  // Dispose geometries on unmount to avoid leaking GPU memory
  useEffect(() => {
    return () => geometries.forEach((g) => g.dispose());
  }, [geometries]);

  const pebbles = useMemo(() => {
    return Array.from({ length: PEBBLE_COUNT }, (_, i) => {
      const depth = randRange(-9, 3); // camera is at z=12, negative = further away
      const depthFactor = THREE.MathUtils.clamp((depth + 9) / 12, 0, 1); // 0 = far, 1 = near

      return {
        id: i,
        geometry: geometries[i % GEOMETRY_VARIANTS],
        basePosition: [randRange(-9, 9), randRange(-5.5, 5.5), depth],
        // tiny particle-sized scale, still slightly bigger for near ones
        scale: randRange(0.018, 0.055) * (0.55 + depthFactor * 0.6),
        color: COLORS[i % COLORS.length],
        // slightly raised from the original 10-30% band to give the bloom
        // pass more to work with now that particles are tiny
        opacity: randRange(0.18, 0.4) * (0.55 + depthFactor * 0.45),
        floatSpeed: randRange(0.09, 0.26),
        floatRangeX: randRange(0.4, 1.1),
        floatRangeY: randRange(0.3, 0.9),
        rotSpeedX: randRange(0.04, 0.11) * (Math.random() < 0.5 ? -1 : 1),
        rotSpeedY: randRange(0.03, 0.09) * (Math.random() < 0.5 ? -1 : 1),
        rotSpeedZ: randRange(0.02, 0.07) * (Math.random() < 0.5 ? -1 : 1),
        seed: Math.random() * 1000,
      };
    });
  }, [geometries]);

  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const targetVec = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Pause all motion when the tab isn't visible
    if (document.hidden) return;

    // Smooth (lerped) pointer avoids any jitter/aggressive snapping
    smoothPointer.current.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      reducedMotion ? 0 : 0.04
    );

    if (groupRef.current) {
      // Subtle whole-field parallax toward the cursor
      groupRef.current.position.x = smoothPointer.current.x * 0.35;
      groupRef.current.position.y = smoothPointer.current.y * 0.2;
    }

    if (reducedMotion) return;

    const t = state.clock.elapsedTime;
    const cursorX = smoothPointer.current.x * (viewport.width / 2);
    const cursorY = smoothPointer.current.y * (viewport.height / 2);

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const p = pebbles[i];

      // Gentle continuous floating drift, seamless via sine/cosine loops
      const floatX = Math.sin(t * p.floatSpeed + p.seed) * p.floatRangeX;
      const floatY = Math.cos(t * p.floatSpeed * 0.8 + p.seed) * p.floatRangeY;
      const floatZ = Math.sin(t * p.floatSpeed * 0.6 + p.seed) * 0.4;

      let x = p.basePosition[0] + floatX;
      let y = p.basePosition[1] + floatY;
      const z = p.basePosition[2] + floatZ;

      // Nearby pebbles ease very slightly toward the cursor
      const dx = cursorX - x;
      const dy = cursorY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = 3.5;
      if (dist < influenceRadius) {
        const strength = (1 - dist / influenceRadius) * 0.25;
        x += dx * strength;
        y += dy * strength;
      }

      // Lerp toward the target instead of snapping straight to it — this is
      // what makes the drift and cursor pull both read as smooth/eased
      // rather than frame-tied and slightly jittery.
      targetVec.current.set(x, y, z);
      const smoothing = 1 - Math.pow(0.001, delta); // framerate-independent ease
      mesh.position.lerp(targetVec.current, smoothing);

      mesh.rotation.x += p.rotSpeedX * delta;
      mesh.rotation.y += p.rotSpeedY * delta;
      mesh.rotation.z += p.rotSpeedZ * delta;
    });
  });

  return (
    <group ref={groupRef}>
      {pebbles.map((p, i) => (
        <mesh
          key={p.id}
          ref={(el) => (meshRefs.current[i] = el)}
          geometry={p.geometry}
          position={p.basePosition}
          scale={p.scale}
        >
          {/* Cheap "glowing glass" look: low roughness + emissive glow.
              Swap for drei's <MeshTransmissionMaterial> if you want true
              refraction, but with 40 instances that costs real frame time. */}
          <meshPhysicalMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={1.3}
            roughness={0.2}
            metalness={0.05}
            clearcoat={0.4}
            clearcoatRoughness={0.3}
            transparent
            opacity={p.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}