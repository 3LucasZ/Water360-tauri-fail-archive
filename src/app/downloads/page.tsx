"use client";

import Image360 from "@/components/Image360";
import Video360 from "@/components/Video360";
import { Stack, Title } from "@mantine/core";

export default function Home() {
  return (
    <Stack>
      <Image360 url={"360.jpg"} />
      <Video360 url={"360.mp4"} />
    </Stack>
  );
}
