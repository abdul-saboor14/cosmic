
"use client";

import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ErrorInfo, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import * as THREE from "three";

import type { Group, Mesh } from "three";
import type { Planet } from "@/data/space";

type Props = {
  planet: Planet;
  compact?: boolean;
};

// These paths match your exact public folder filenames.
const PLANET_TEXTURES: Record<string, string> = {
  Mercury: "/texture/mercury/2k_mercury.jpg",
  Venus: "/texture/venus/2k_venus_atmosphere.jpg",
  Earth: "/texture/earth/2k_earth_daymap.jpg",
  Mars: "/texture/mars/2k_mars.jpg",
  Jupiter: "/texture/jupiter/2k_jupiter.jpg",
  Saturn: "/texture/saturn/2k_saturn.jpg",
  Uranus: "/texture/uranus/2k_uranus.jpg",
  Neptune: "/texture/neptune/2k_neptune.jpg",
};

const CLOUD_TEXTURE = "/texture/earth/2k_earth_clouds.jpg";

// If a texture cannot load, show a fallback instead
// of crashing the entire website.
class SceneErrorBoundary extends Component<
  { children: ReactNode; planet: Planet },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Planet renderer error:", error, info);
  }

  render() {
    if (this.state.failed) {
      return <PlanetFallback planet={this.props.planet} />;
    }
    return this.props.children;
  }
}

function EarthClouds({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const cloudRef = useRef<Mesh>(null);
  const cloudTexture = useTexture(CLOUD_TEXTURE);

  useEffect(() => {
    cloudTexture.colorSpace = THREE.NoColorSpace;
    cloudTexture.anisotropy = 8;
    cloudTexture.needsUpdate = true;
  }, [cloudTexture]);

  useFrame((_, delta) => {
    if (!reducedMotion && cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.008;
    }
  });

  return (
    <>
      {/* Thin transparent cloud layer */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.516, 96, 96]} />
        <meshStandardMaterial
          color="#ffffff"
          alphaMap={cloudTexture}
          transparent
          opacity={0.65}
          alphaTest={0.025}
          roughness={1}
          metalness={0}
          depthWrite={false}
        />
      </mesh>

      {/* Soft atmospheric edge */}
      <mesh>
        <sphereGeometry args={[1.54, 64, 64]} />
        <meshBasicMaterial
          color="#319cff"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function SaturnRings() {
  const rings = [
    { inner: 1.78, outer: 1.93, color: "#b7a483", opacity: 0.4 },
    { inner: 1.96, outer: 2.14, color: "#e4d0a6", opacity: 0.75 },
    { inner: 2.18, outer: 2.28, color: "#655847", opacity: 0.35 },
    { inner: 2.32, outer: 2.62, color: "#c9b28e", opacity: 0.7 },
    { inner: 2.65, outer: 2.75, color: "#99866a", opacity: 0.35 },
  ];

  return (
    <group rotation={[1.15, 0.18, 0.13]}>
      {rings.map((ring, index) => (
        <mesh key={index}>
          <ringGeometry args={[ring.inner, ring.outer, 128]} />
          <meshStandardMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
            roughness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

function UranusRings() {
  return (
    <group rotation={[1.3, 0.1, 0.1]}>
      <mesh>
        <ringGeometry args={[1.87, 1.96, 128]} />
        <meshBasicMaterial
          color="#b5e9ec"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function PlanetModel({
  planet,
  reducedMotion,
}: {
  planet: Planet;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<Group>(null);

  const path =
    PLANET_TEXTURES[planet.name] ??
    PLANET_TEXTURES.Earth;

  const surface = useTexture(path);

  useEffect(() => {
    surface.colorSpace = THREE.SRGBColorSpace;
    surface.anisotropy = 8;
    surface.needsUpdate = true;
  }, [surface]);

  useFrame((_, delta) => {
    if (!reducedMotion && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }
  });

  const isEarth = planet.name === "Earth";
  const isSaturn = planet.name === "Saturn";
  const isUranus = planet.name === "Uranus";
  const isRocky =
    planet.name === "Mercury" ||
    planet.name === "Mars";

  return (
    <group>
      <group
        ref={groupRef}
        rotation={[
          isUranus ? 1.6 : 0.1,
          0,
          0.1,
        ]}
      >
        {/* High-resolution planetary surface */}
        <mesh>
          <sphereGeometry args={[1.5, 96, 96]} />
          <meshStandardMaterial
            map={surface}
            roughness={isEarth ? 0.83 : 1}
            metalness={0}
            bumpMap={isRocky ? surface : undefined}
            bumpScale={isRocky ? 0.008 : 0}
          />
        </mesh>

        {isEarth && (
          <EarthClouds reducedMotion={reducedMotion} />
        )}
      </group>

      {isSaturn && <SaturnRings />}
      {isUranus && <UranusRings />}
    </group>
  );
}

function SpaceScene({
  planet,
  compact,
  reducedMotion,
}: {
  planet: Planet;
  compact: boolean;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5.8],
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "low-power",
      }}
    >
      <color attach="background" args={["#030712"]} />

      <ambientLight intensity={0.2} />

      {/* Main sunlight */}
      <directionalLight
        position={[5, 2.5, 6]}
        intensity={2.7}
        color="#fff5ea"
      />

      {/* Subtle blue fill light */}
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.15}
        color="#60a5fa"
      />

      <Suspense fallback={null}>
        <PlanetModel
          key={planet.name}
          planet={planet}
          reducedMotion={reducedMotion}
        />

        {!compact && (
          <Stars
            radius={80}
            depth={45}
            count={800}
            factor={3}
            saturation={0}
            fade
            speed={reducedMotion ? 0 : 0.1}
          />
        )}
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={3.5}
        maxDistance={10}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.2}
        enableDamping
        dampingFactor={0.07}
      />
    </Canvas>
  );
}

function PlanetFallback({ planet }: { planet: Planet }) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-[#030712]">
      <div
        role="img"
        aria-label={`Illustration of ${planet.name}`}
        className="rounded-full h-44 w-44 md:h-56 md:w-56"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${planet.color}, ${planet.secondary} 55%, #020617 95%)`,
          boxShadow: `0 0 65px ${planet.color}25`,
        }}
      />
      <p className="text-xs text-slate-400 mt-5 text-center px-4">
        2D FALLBACK · {planet.name.toUpperCase()}
      </p>
    </div>
  );
}

export default function PlanetScene({
  planet,
  compact = false,
}: Props) {
  const [webglAvailable, setWebglAvailable] =
    useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl");

      setWebglAvailable(Boolean(context));
    } catch {
      setWebglAvailable(false);
    }

    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const handleMotion = () => {
      setReducedMotion(media.matches);
    };

    handleMotion();
    media.addEventListener("change", handleMotion);

    return () => {
      media.removeEventListener("change", handleMotion);
    };
  }, []);

  const heightClass = compact
    ? "h-[280px]"
    : "h-[360px] md:h-[510px]";

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-xl bg-[#030712]`}
      aria-label={`3D model of ${planet.name}`}
    >
      {webglAvailable === null ? (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-xs text-cyan-300 animate-pulse tracking-widest">
            LOADING OBSERVATORY...
          </p>
        </div>
      ) : webglAvailable ? (
        <SceneErrorBoundary
          key={planet.name}
          planet={planet}
        >
          <SpaceScene
            planet={planet}
            compact={compact}
            reducedMotion={reducedMotion}
          />
        </SceneErrorBoundary>
      ) : (
        <PlanetFallback planet={planet} />
      )}

      <div className="absolute top-4 left-4 pointer-events-none">
        <p className="text-[10px] text-cyan-300 font-mono tracking-widest">
          ● PLANETARY OBSERVATION
        </p>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none">
        <p className="text-[10px] text-slate-500 font-mono">
          {planet.name.toUpperCase()} / SOL
        </p>
      </div>
    </div>
  );
}
