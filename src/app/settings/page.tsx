"use client";

import {
  Button,
  Center,
  Flex,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { downloadDir } from "@tauri-apps/api/path";
import { isValidIP } from "@/services/mini_helper";
import {
  IconCancel,
  IconDeviceFloppy,
  IconEdit,
  IconX,
} from "@tabler/icons-react";
import { responsiveBodyWidth } from "@/services/constants";
import { api } from "@/services/api_helper";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [IP, setIP] = useState("");
  const [MAC, setMAC] = useState("");
  const [downloadsDir, setDownloadsDir] = useState("");
  const [RTMP, setRTMP] = useState("");

  useEffect(() => {
    const load = async () => {
      const settings = await (await api("/station/getSettings")).json();
      console.log(settings);
      setIP(settings["IP"]);
      setMAC(settings["MAC"]);
      setDownloadsDir(settings["downloadsDir"] || (await downloadDir()));
      setRTMP(settings["RTMP"]);
    };
    load();
  }, []);

  return (
    <Flex justify={"center"}>
      <Stack w={responsiveBodyWidth}>
        <TextInput
          label={"Khadas IP Address"}
          value={IP}
          onChange={(event) => {
            const newIP = event.currentTarget.value;
            setIP(newIP);
          }}
          error={isValidIP(IP) ? "" : "Invalid IP address"} // TODO: add [] around IPv6
        />
        <TextInput label={"Khadas Mac Address"} value={MAC} disabled />
        <TextInput label={"Downloads folder"} value={downloadsDir} disabled />
        <PasswordInput
          label={"RTMP key"}
          value={RTMP}
          onChange={(event) => {
            const newRtmpKey = event.currentTarget.value;
            setRTMP(newRtmpKey);
          }}
        />
        <Button.Group>
          <Button
            size="sm"
            onClick={() => {
              router.refresh();
            }}
            color="red"
            leftSection={<IconX stroke={1.5} />}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={async () => {
              await api("/station/saveSettings", {
                IP,
                MAC,
                downloadsDir,
                RTMP,
              });
              router.refresh();
            }}
            color="blue"
            leftSection={<IconDeviceFloppy stroke={1.5} />}
          >
            Save
          </Button>
        </Button.Group>
      </Stack>
    </Flex>
  );
}
