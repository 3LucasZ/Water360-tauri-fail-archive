"use client";

import { NavLink, AppShell, Burger, Title, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCapture,
  IconVideo,
  IconBrandYoutube,
  IconDashboard,
  IconEye,
  IconSubmarine,
  IconBug,
  IconSettings,
  IconHome,
  IconHome2,
  IconSmartHome,
  IconPhoto,
  IconCamera,
} from "@tabler/icons-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import path from "path";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  //--NAVLINK--
  const [opened, { toggle }] = useDisclosure();
  const navLinkDatas = [
    { link: "/", label: "Home", icon: IconHome },
    { link: "/capture", label: "Capture", icon: IconCamera },
    { link: "/status", label: "Status", icon: IconDashboard },
    { link: "/downloads", label: "Downloads", icon: IconEye },
    { link: "/remote", label: "Remote Media", icon: IconSubmarine },
    { link: "/debug", label: "Debug", icon: IconBug },
    { link: "/settings", label: "Settings", icon: IconSettings },
  ];
  const pathname = usePathname();
  console.log(pathname);
  const navLinks = navLinkDatas.map((Item) => (
    <NavLink
      key={Item.label}
      href={Item.link}
      label={Item.label}
      leftSection={<Item.icon />}
      variant="filled"
      active={Item.link == pathname}
    />
  ));

  //--RET--
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
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
      <AppShell.Navbar>{navLinks}</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
