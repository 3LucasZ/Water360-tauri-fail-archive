"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {
  AppShell,
  Group,
  Burger,
  Skeleton,
  CheckIcon,
  rem,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { under360 } from "./services/api_helper";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <CheckIcon
            style={{ width: rem(20), height: rem(20) }}
            color="var(--mantine-color-blue-filled)"
          />
          water360
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Button
          variant="filled"
          onClick={async () => {
            const res = await fetch("/api/wol", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({}),
            });
          }}
        >
          /wol
        </Button>
        <Button
          onClick={async () => {
            under360("/status/khadas", { freeSpace: "y", totalSpace: "y" });
          }}
        >
          /under360/status/khadas
        </Button>
        <Button
          onClick={async () => {
            under360("/ls");
          }}
        >
          /under360/ls
        </Button>
        <Button
          onClick={async () => {
            under360("/command/connect");
          }}
        >
          /under360/command/connect
        </Button>
        <Button
          onClick={async () => {
            under360("/inspect", {
              url: "http://127.0.0.1:9099/DCIM/Camera01/IMG_20230621_051555_00_002.insp",
            });
          }}
        >
          /under360/inspect
        </Button>
        <Button
          onClick={async () => {
            under360("/export/image", {
              url: "http://127.0.0.1:9099/DCIM/Camera01/IMG_20230621_051555_00_002.insp",
            });
          }}
        >
          /under360/export/image
        </Button>
        <Button
          onClick={async () => {
            const res = await fetch("/api/adb/devices", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            });
          }}
        >
          /adb/devices
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}
