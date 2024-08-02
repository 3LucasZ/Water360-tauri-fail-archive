"use client";

import {
  NavLink,
  AppShell,
  Burger,
  Title,
  Group,
  useMantineColorScheme,
  ActionIcon,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDashboard,
  IconEye,
  IconSubmarine,
  IconBug,
  IconSettings,
  IconHome,
  IconCamera,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  //--COLOR MODE--
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  //--NAVLINK--
  const [opened, { toggle }] = useDisclosure();
  const navLinkDatas = [
    { link: "/", label: "Home", icon: IconHome },
    { link: "/status", label: "Status", icon: IconDashboard },
    { link: "/capture", label: "Capture", icon: IconCamera },
    { link: "/remote", label: "Remote Media", icon: IconSubmarine },
    { link: "/downloads", label: "Downloads", icon: IconEye },
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
      leftSection={<Item.icon stroke={1.5} />}
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
          <Image src={"logo.png"} width={30} height={30} alt={""} priority />
          <Title order={2} c="blue">
            Water360
          </Title>
          <Group justify="end" flex={1}>
            <ActionIcon
              onClick={() => {
                // updBodyColor();
                setColorScheme(
                  computedColorScheme === "light" ? "dark" : "light"
                );
              }}
              variant="default"
              size="lg"
              aria-label="Toggle color scheme"
            >
              {computedColorScheme === "dark" ? (
                <IconSun stroke={1.5} />
              ) : (
                <IconMoon stroke={1.5} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>{navLinks}</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
