import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import PebbleField from "./PebbleField";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/**
 * Fixed, full-screen, click-through canvas that sits behind all page
 * content. Mount this once near the root of the app (see INTEGRATION.md).
 */
export default function BackgroundScene() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none", // never intercepts clicks/scroll
      }}
    >
      <Canvas
        dpr={[1, 1.5]} // capped pixel ratio keeps mobile GPUs at 60fps
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          // Pinned explicitly so mobile GPUs (which often default
          // differently than desktop) render the exact same purple.
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{ position: [0, 0, 12], fov: 45, near: 1, far: 30 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} color="#ffffff" />
        <pointLight position={[6, 4, 8]} intensity={40} color="#A855F7" distance={30} decay={2} />
        <pointLight position={[-6, -3, 4]} intensity={22} color="#C084FC" distance={25} decay={2} />

        <Suspense fallback={null}>
          <PebbleField reducedMotion={reducedMotion} />
        </Suspense>

        {/* Skip post-processing entirely under reduced-motion / low-end profiles */}
        {!reducedMotion && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.7}
              luminanceThreshold={0.04}
              luminanceSmoothing={0.85}
              mipmapBlur
            />
            <DepthOfField
              focusDistance={0.015}
              focalLength={0.04}
              bokehScale={2.5}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}