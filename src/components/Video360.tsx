"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BackSide, TextureLoader } from "three";
import { Suspense, useEffect, useState } from "react";
import { AspectRatio, Slider, Stack } from "@mantine/core";

type Props = {
  url: string;
};
export default function Video360(props: Props) {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "360.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    // vid.autoplay = true;
    vid.playsInline = true;
    //set the max time
    // set({ timestamp: { max: vid.duration } })
    // Update Leva
    // vid.ontimeupdate = () => set({ timestamp: vid.currentTime });
    return vid;
  });
  const [value, setValue] = useState(40);

  useEffect(() => {
    video.play();
  }, [video]);
  // const [video] = useState(() => {
  //   const el = document.createElement("video");
  //   el.src = "360.mp4";
  //   el.crossOrigin = "Anonymous";
  //   el.play();
  //   return el;
  // });
  const texture = useLoader(TextureLoader, "360.jpg");

  return (
    <Stack>
      <AspectRatio ratio={1080 / 720}>
        <Canvas camera={{ position: [0, 0, 0] }}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping
            dampingFactor={0.2}
            // autoRotate
            rotateSpeed={-0.5}
          />
          <Suspense fallback={null}>
            <mesh>
              <sphereGeometry attach="geometry" args={[500, 60, 40]} />
              {/* <meshBasicMaterial attach="material" map={texture} side={BackSide}>
            <videoTexture attach={"map"} args={[video]} />
          </meshBasicMaterial> */}
              <meshBasicMaterial side={BackSide}>
                <videoTexture attach={"map"} args={[video]} />
              </meshBasicMaterial>
            </mesh>
          </Suspense>
        </Canvas>
      </AspectRatio>
      <Slider />
    </Stack>
  );
}
