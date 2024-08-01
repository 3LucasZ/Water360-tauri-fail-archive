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

export default function Home() {
  const adbExists = commandExists.sync("adb");
  const khadasPingable = false;
  const khadasAdbConnected = false;
  const khadasAppRunning = false;
  const khadasServerRunning = false;
  const cameraConnected = false;
  return (
    <Stack>
      <DeviceCard name="Ground Station">
        <Badge color={adbExists ? "green" : "red"}>
          ADB {adbExists ? "installed" : "not found"}
        </Badge>
      </DeviceCard>
      <DeviceCard name="Khadas">
        <SimpleGrid cols={2}>
          <Container gap={"xs"}>
            <Badge color={khadasPingable ? "green" : "red"}>
              {khadasPingable ? "detected" : "unpingable"}
            </Badge>
            <Badge color={khadasAdbConnected ? "green" : "red"}>
              {khadasAdbConnected ? "connected" : "disconnected"}
            </Badge>
            <Badge color={khadasAppRunning ? "green" : "red"}>
              {khadasAppRunning ? "app on" : "app off"}
            </Badge>
            <Badge color={khadasServerRunning ? "green" : "red"}>
              {khadasServerRunning ? "server on" : "server off"}
            </Badge>
          </Container>
          <MemoryDisplay used={30} total={100} />
        </SimpleGrid>
      </DeviceCard>
      <DeviceCard name="Camera">
        <SimpleGrid cols={2}>
          <Container>
            <Badge color={cameraConnected ? "green" : "red"}>
              {cameraConnected ? "Connected" : "Disconnected"}
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
