"use client";

import { api, under360 } from "@/services/api_helper";
import {
  Alert,
  Badge,
  Container,
  Stack,
  Title,
  Text,
  Paper,
  Card,
  Progress,
  Button,
} from "@mantine/core";
import { RingProgress, SimpleGrid, Center, Group, rem } from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconSpace,
} from "@tabler/icons-react";
import { IconAlertCircle } from "@tabler/icons-react";
import commandExists from "command-exists";
import { useEffect, useState } from "react";

export default function Home() {
  //station status
  const [adbInstalled, setAdbInstalled] = useState(undefined);
  //khadas status
  const [pingable, setPingable] = useState(undefined);
  const [adbConnected, setAdbConnected] = useState(undefined);
  const [isAppRun, setIsAppRun] = useState(undefined);
  //cam status
  const [camStatus, setCamStatus] = useState({
    connected: undefined,
  });
  //initial data fetch
  useEffect(() => {
    //station status
    api("/station/adbInstalled").then((res) =>
      res.json().then((json) => setAdbInstalled(json["adbInstalled"]))
    );
    //khadas status
    api("/khadas/pingable").then((res) =>
      res.json().then((json) => setPingable(json["pingable"]))
    );
    api("/khadas/adbConnected").then((res) =>
      res.json().then((json) => setAdbConnected(json["adbConnected"]))
    );
    api("/khadas/isAppRun").then((res) =>
      res.json().then((json) => setIsAppRun(json["isAppRun"]))
    );
    //cam status
    under360("/status").then((res) =>
      res.json().then((json) => setCamStatus(json))
    );
    // Experimental infinite data fetching
    // const interval = setInterval(fetchData, 5000); // Infinite interval fetching
    // return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Stack>
      <DeviceCard name="Ground Station">
        <Badge
          color={adbInstalled ? "green" : "red"}
          hidden={adbInstalled == undefined}
        >
          ADB {adbInstalled ? "installed" : "not found"}
        </Badge>
      </DeviceCard>
      <DeviceCard name="Khadas">
        <SimpleGrid cols={2}>
          <Container>
            <Badge
              color={pingable ? "green" : "red"}
              hidden={pingable == undefined}
            >
              {pingable ? "detected" : "unpingable"}
            </Badge>

            <Badge
              color={adbConnected ? "green" : "red"}
              hidden={adbConnected == undefined}
            >
              {adbConnected ? "connected" : "disconnected"}
            </Badge>
            <Badge
              color={isAppRun ? "green" : "red"}
              hidden={isAppRun == undefined}
            >
              {isAppRun ? "app on" : "app off"}
            </Badge>
          </Container>
          <MemoryDisplay used={30} total={100} />
        </SimpleGrid>
        <Button
          radius={"xl"}
          onClick={() => {
            api("/khadas/wol");
          }}
        >
          Wake
        </Button>
        <Button
          radius={"xl"}
          onClick={() => {
            api("/khadas/connect");
          }}
        >
          Connect
        </Button>
        <Button
          radius={"xl"}
          onClick={() => {
            api("/khadas/runApp");
          }}
        >
          Start Activity
        </Button>
      </DeviceCard>
      <DeviceCard name="Camera">
        <SimpleGrid cols={2}>
          <Container>
            <Badge
              color={camStatus.connected ? "green" : "red"}
              hidden={camStatus.connected == undefined}
            >
              {camStatus.connected ? "Connected" : "Disconnected"}
            </Badge>
          </Container>
          <MemoryDisplay used={30} total={100} />
        </SimpleGrid>
        <Button
          radius={"xl"}
          onClick={() => {
            under360("/command/connect");
          }}
        >
          Connect
        </Button>
      </DeviceCard>
    </Stack>
  );
}

function DeviceCard({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Paper withBorder p="md">
      <Stack>
        <Center>
          <Title order={3}>{name}</Title>
        </Center>
        {children}
      </Stack>
    </Paper>
  );
}
function MemoryDisplay({ used, total }: { used: number; total: number }) {
  const usedPercent = Math.round((100 * used) / total);

  return (
    <Paper
      // withBorder
      radius="md"
      // p="xs"
    >
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: usedPercent, color: "blue" }]}
          label={
            <Center>
              <IconSpace
                style={{ width: rem(20), height: rem(20) }}
                stroke={1.5}
              />
            </Center>
          }
        />
        <div>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {"storage"}
          </Text>
          <Text fw={700} size="xl">
            {used + "/" + total}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
