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
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { under360 } from "../services/api_helper";
import { Viewer360 } from "../components/Viewer360";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header c={"blue"}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src={"logo.png"} width={30} height={30} alt={""} />
          <Title order={2} c="blue">
            Water360
          </Title>
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
        <Viewer360 url={""} />
      </AppShell.Main>
    </AppShell>
  );
}
