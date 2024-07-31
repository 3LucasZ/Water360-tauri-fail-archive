"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BackSide } from "three";
import { Suspense, useState } from "react";
import { AspectRatio, Slider, Stack } from "@mantine/core";

type Props = {
  url: string;
};
export default function Video360(props: Props) {
  const [videoRef, setRef] = useState<HTMLVideoElement>();

  return (
    <Stack>
      <video ref={(newRef) => setRef(newRef!)} controls preload="none">
        <source src={props.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {videoRef && (
        <AspectRatio ratio={1080 / 720}>
          <Canvas camera={{ position: [0, 0, 0.1] }}>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.2}
            />
            <Suspense fallback={null}>
              <mesh>
                <sphereGeometry attach="geometry" args={[500, 60, 40]} />
                <meshBasicMaterial side={BackSide}>
                  <videoTexture attach={"map"} args={[videoRef]} />
                </meshBasicMaterial>
              </mesh>
            </Suspense>
          </Canvas>
        </AspectRatio>
      )}
      <Slider />
    </Stack>
  );
}
