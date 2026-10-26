
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { Mesh, Group } from "three";
import type { Planet } from "@/data/space";

type Props = {
  planet: Planet;
  compact?: boolean;
};

function PlanetMesh({ planet }: { planet: Planet }) {
  const group = useRef<Group>(null);
  const sphere = useRef<Mesh>(null);

  const isSaturn = planet.name === "Saturn";
  const isUranus = planet.name === "Uranus";
  const isEarth = planet.name === "Earth";

  useFrame((state, delta) => {
    if (sphere.current) {
      sphere.current.rotation.y += delta * 0.10;
    }

    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.075;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={sphere}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color={planet.color}
          roughness={0.88}
          metalness={0.03}
        />

        {isEarth && (
          <group>
            <mesh position={[0.48, 0.35, 1.38]} rotation={[0.2, 0, -0.4]}>
              <sphereGeometry args={[0.37, 16, 16]} />
              <meshStandardMaterial color={planet.secondary} />
            </mesh>
            <mesh position={[-0.68, -0.1, 1.22]}>
              <sphereGeometry args={[0.32, 16, 16]} />
              <meshStandardMaterial color={planet.secondary} />
            </mesh>
          </group>
        )}
      </mesh>

      {isEarth && (
        <mesh>
          <sphereGeometry args={[1.56, 48, 48]} />
          <meshBasicMaterial
            color="#34b9ff"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {(isSaturn || isUranus) && (
        <group rotation={[Math.PI / 2.8, 0.12, 0]}>
          <mesh>
            <ringGeometry args={[1.9, 2.65, 128]} />
            <meshBasicMaterial
              color={isSaturn ? "#d8bc89" : "#9ad4dd"}
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[2.72, 2.83, 128]} />
            <meshBasicMaterial
              color={planet.secondary}
              transparent
              opacity={0.42}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function PlanetScene({ planet, compact = false }: Props) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);

    const listener = () => setReducedMotion(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  if (supported === null) {
    return (
      <div className="planet-fallback">
        <span className="text-cyan-300 animate-pulse text-sm">
          INITIALIZING PLANETARY RENDERER...
        </span>
      </div>
    );
  }

  if (!supported) {
    return (
      <div className="planet-fallback">
        <div
          className="fallback-sphere"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${planet.color}, ${planet.secondary} 55%, #020617 95%)`,
          }}
          role="img"
          aria-label={`Illustration of ${planet.name}`}
        />
        <p className="text-xs text-slate-400 mt-5">
          2D visualization · WebGL unavailable
        </p>
      </div>
    );
  }

  return (
    <div
      className={compact ? "h-[280px] w-full" : "h-[360px] md:h-[510px] w-full"}
      aria-label={`Interactive 3D model of ${planet.name}`}
    >
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={1.25} />
        <directionalLight position={[5, 3, 5]} intensity={2.6} />
        <pointLight position={[-4, -2, -3]} intensity={40} color="#2563eb" />

        <Suspense fallback={null}>
          <PlanetMesh key={planet.name} planet={planet} />
          {!compact && (
            <Stars
              radius={70}
              depth={40}
              count={1000}
              factor={3}
              saturation={0}
              fade
              speed={reducedMotion ? 0 : 0.2}
            />
          )}
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={3.6}
          maxDistance={9}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.25}
          enableDamping
          dampingFactor={0.07}
        />
      </Canvas>
    </div>
  );
}
