"use client";

import { Button, Center, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { downloadDir } from "@tauri-apps/api/path";
import { isValidIP } from "@/services/mini_helper";
import {
  IconCancel,
  IconDeviceFloppy,
  IconEdit,
  IconX,
} from "@tabler/icons-react";

export default function Home() {
  const [isEdit, setIsEdit] = useState(false);

  const [IP, setIP] = useState("");
  const [downloadDirPath, setDownloadDirPath] = useState("");
  const [rtmpKey, setRtmpKey] = useState("fake-RTMP-keyT-oRep-lace");

  useEffect(() => {
    const load = async () => {
      const downloadDirPath = await downloadDir();
      setDownloadDirPath(downloadDirPath);
    };
    load();
  });

  return (
    <Stack>
      <TextInput
        label={"Khadas IP Address"}
        value={IP}
        onChange={(event) => {
          const newIP = event.currentTarget.value;
          setIP(newIP);
        }}
        maw={400}
        error={isValidIP(IP) ? "" : "Invalid IP address"} // TODO: add [] around IPv6
      />
      <TextInput
        label={"Khadas Mac Address"}
        value={"c8:63:14:74:1f:96"}
        maw={400}
        disabled
      />
      <TextInput
        label={"Downloads folder"}
        value={downloadDirPath}
        maw={400}
        disabled
      />
      <PasswordInput
        label={"RTMP key"}
        value={rtmpKey}
        maw={400}
        onChange={(event) => {
          const newRtmpKey = event.currentTarget.value;
          setRtmpKey(newRtmpKey);
        }}
      />
      {isEdit ? (
        <Button.Group maw={400}>
          <Button
            onClick={() => {
              setIsEdit(!isEdit);
            }}
            w={"100%"}
            color="red"
            leftSection={<IconX stroke={1.5} />}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsEdit(!isEdit);
            }}
            w={"100%"}
            color="blue"
            leftSection={<IconDeviceFloppy stroke={1.5} />}
          >
            Save
          </Button>
        </Button.Group>
      ) : (
        <Button
          maw={200}
          size="sm"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
          color="blue"
          leftSection={<IconEdit stroke={1.5} />}
        >
          Edit
        </Button>
      )}
    </Stack>
  );
}
