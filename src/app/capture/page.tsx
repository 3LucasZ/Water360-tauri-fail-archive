"use client";

import { useState } from "react";
import {
  Center,
  rem,
  SegmentedControl,
  Stack,
  Image,
  AspectRatio,
  Button,
  Container,
} from "@mantine/core";
import {
  IconBrandYoutube,
  IconCapture,
  IconPlayerStop,
  IconVideo,
} from "@tabler/icons-react";
import { under360 } from "@/services/api_helper";
import Image360 from "@/components/Image360";
import { responsiveBodyWidth } from "@/services/constants";

export default function Home() {
  const [mode, setMode] = useState("Photo");
  const [isRecording, setIsRecording] = useState(false);
  const [isLivestreaming, setIsLivestreaming] = useState(false);

  const [previewData, setPreviewData] = useState("");

  const photoFooter = (
    <Center>
      <Button
        radius={"xl"}
        size="lg"
        w={300}
        color="blue"
        onClick={async () => {
          const res = await under360("/command/showPreview");
          const json = await res.json();
          setPreviewData(json["data"]);
        }}
      >
        Capture
      </Button>
    </Center>
  );
  const recordFooter = (
    <Center>
      <Button
        radius={"xl"}
        size="lg"
        w={300}
        onClick={() => {
          setIsRecording(!isRecording);
        }}
        color={isRecording ? "red" : "blue"}
        leftSection={isRecording ? <IconPlayerStop /> : <IconVideo />}
      >
        {isRecording ? "Stop" : "Record"}
      </Button>
    </Center>
  );
  const livestreamFooter = (
    <Center>
      <Button
        radius={"xl"}
        size="lg"
        w={300}
        onClick={() => {
          setIsLivestreaming(!isLivestreaming);
        }}
        color={isLivestreaming ? "red" : "blue"}
        leftSection={
          isLivestreaming ? <IconPlayerStop /> : <IconBrandYoutube />
        }
      >
        {isLivestreaming ? "Stop" : "Stream"}
      </Button>
    </Center>
  );

  const buttonDatas = [
    { mode: "Photo", icon: IconCapture, body: photoFooter },
    { mode: "Record", icon: IconVideo, body: recordFooter },
    { mode: "Livestream", icon: IconBrandYoutube, body: livestreamFooter },
  ];

  const footer = buttonDatas.filter((data) => {
    return data.mode == mode;
  })[0].body;

  return (
    <Center>
      <Stack maw={600}>
        <SegmentedControl
          value={mode}
          onChange={(value) => {
            setMode(value);
          }}
          data={buttonDatas.map((ButtonData) => {
            return {
              value: ButtonData.mode,
              label: (
                <Center style={{ gap: 10 }}>
                  <ButtonData.icon
                    style={{ width: rem(16), height: rem(16) }}
                  />
                  <span>{ButtonData.mode}</span>
                </Center>
              ),
            };
          })}
        />
        <Container fluid w={responsiveBodyWidth}>
          {previewData.length > 1 ? (
            <Image360 url={"data:image/png;base64," + previewData} />
          ) : (
            <AspectRatio ratio={1080 / 720}>
              <Image alt="" bg={"dark.0"} />
            </AspectRatio>
          )}
        </Container>
        {footer}
      </Stack>
    </Center>
  );
}

const uri = "data:image/png;base64,";
