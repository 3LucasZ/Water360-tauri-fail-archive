"use client";

import { under360 } from "@/services/api_helper";
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
  const [stationStatus, setStationStatus] = useState({
    adb: false,
  });
  const [khadasStatus, setKhadasStatus] = useState({
    pingable: false,
    connected: false,
    running: false,
  });
  const [camStatus, setCamStatus] = useState({
    connected: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      // setStationStatus(await )
      setCamStatus(await (await under360("/status/camera")).json());
    };
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 1000); // Fetch every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Stack>
      <DeviceCard name="Ground Station">
        <Badge color={stationStatus["adb"] ? "green" : "red"}>
          ADB {stationStatus["adb"] ? "installed" : "not found"}
        </Badge>
      </DeviceCard>
      <DeviceCard name="Khadas">
        <SimpleGrid cols={2}>
          <Container>
            <Badge color={khadasStatus["pingable"] ? "green" : "red"}>
              {khadasStatus["pingable"] ? "detected" : "unpingable"}
            </Badge>
            <Badge color={khadasStatus["connected"] ? "green" : "red"}>
              {khadasStatus["connected"] ? "connected" : "disconnected"}
            </Badge>
            <Badge color={khadasStatus["running"] ? "green" : "red"}>
              {khadasStatus["running"] ? "app on" : "app off"}
            </Badge>
          </Container>
          <MemoryDisplay used={30} total={100} />
        </SimpleGrid>
      </DeviceCard>
      <DeviceCard name="Camera">
        <SimpleGrid cols={2}>
          <Container>
            <Badge color={camStatus["connected"] ? "green" : "red"}>
              {camStatus["connected"] ? "Connected" : "Disconnected"}
            </Badge>
          </Container>
          <MemoryDisplay used={30} total={100} />
        </SimpleGrid>
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
