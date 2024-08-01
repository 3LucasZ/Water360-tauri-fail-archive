"use client";

import { PasswordInput, Stack, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { downloadDir } from "@tauri-apps/api/path";
import { isValidIP } from "@/services/mini_helper";

export default function Home() {
  const [IP, setIP] = useState("");
  const [downloadDirPath, setDownloadDirPath] = useState("");
  const [rtmpKey, setRtmpKey] = useState("xxxx-xxxx-xxxx-xxxx-xxxx");

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
        error={isValidIP(IP) ? "" : "Invalid IP address"} // TODO: add [] around IPv6
      />
      <TextInput
        label={"Khadas Mac Address"}
        value={"c8:63:14:74:1f:96"}
        disabled
      />
      <TextInput label={"Downloads folder"} value={downloadDirPath} disabled />
      <PasswordInput
        label={"RTMP key"}
        value={rtmpKey}
        onChange={(event) => {
          const newRtmpKey = event.currentTarget.value;
          setRtmpKey(newRtmpKey);
        }}
      />
    </Stack>
  );
}
