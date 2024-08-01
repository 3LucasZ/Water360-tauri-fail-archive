"use client";

import { useState } from "react";
import {
  Center,
  FloatingIndicator,
  Group,
  rem,
  SegmentedControl,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import classes from "./Demo.module.css";
import {
  IconBrandYoutube,
  IconCapture,
  IconCode,
  IconLivePhoto,
  IconVideo,
} from "@tabler/icons-react";

const buttonDatas = [
  { name: "Photo", icon: IconCapture },
  { name: "Record", icon: IconVideo },
  { name: "Livestream", icon: IconBrandYoutube },
];

export default function Home() {
  return (
    <Stack>
      <SegmentedControl
        data={buttonDatas.map((ButtonData) => {
          return {
            value: ButtonData.name,
            label: (
              <Center style={{ gap: 10 }}>
                <ButtonData.icon style={{ width: rem(16), height: rem(16) }} />
                <span>{ButtonData.name}</span>
              </Center>
            ),
          };
        })}
      />
    </Stack>
  );
}
