"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type Props = {
  url: string;
};
export function Viewer360(props: Props) {
  return (
    // <Canvas camera={{ zoom: 5, position: [0, 0, 0] }}>
    //   <OrbitControls />
    //   <mesh position={[0, 0, 0]}>
    //     <sphereGeometry args={[15, 32, 16]} />
    //     <meshBasicMaterial color={"#FEB2B2"} />
    //   </mesh>
    // </Canvas>
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}
