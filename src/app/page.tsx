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
          onClick={() => {
            var wol = require("wake_on_lan");
            wol.wake("20:DE:20:DE:20:DE");
          }}
        >
          wakeonlan
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}
