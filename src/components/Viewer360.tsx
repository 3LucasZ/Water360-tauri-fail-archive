"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BackSide, TextureLoader } from "three";
import { Suspense } from "react";

type Props = {
  url: string;
};
export function Viewer360(props: Props) {
  function Dome() {
    const texture = useLoader(TextureLoader, "360.jpg");
    return (
      <mesh>
        <sphereGeometry attach="geometry" args={[500, 60, 40]} />
        <meshBasicMaterial attach="material" map={texture} side={BackSide} />
      </mesh>
    );
  }
  return (
    <Canvas camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.2}
        // autoRotate
        rotateSpeed={-0.5}
      />
      <Suspense fallback={null}>
        <Dome />
      </Suspense>
    </Canvas>
  );
}
