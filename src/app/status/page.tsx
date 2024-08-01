import { Alert, Badge, Container, Stack, Title, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import commandExists from "command-exists";

export default function Home() {
  const adbExists = commandExists.sync("adb");
  const khadasConnected = false;
  return (
    <Stack>
      <Container>
        <Title>Ground Station</Title>
        <Badge color={adbExists ? "green" : "red"}>
          ADB: {adbExists ? "installed" : "not found"}
        </Badge>
      </Container>
      <Container>
        <Title>Khadas</Title>
        <Badge color={khadasConnected ? "green" : "red"}>
          {khadasConnected ? "Connected" : "Disconnected"}
        </Badge>
      </Container>
      <Container>
        <Title>Camera</Title>
      </Container>
    </Stack>
  );
}
