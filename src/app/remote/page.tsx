"use client";

import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Title,
  Image,
  Text,
  Stack,
} from "@mantine/core";

export default function Home() {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}>
      <FileCard fileName={"hello.jpg"} isPhoto={false} durationMs={1000} />
    </SimpleGrid>
  );
}
function FileCard({
  fileName,
  isPhoto,
  durationMs,
}: {
  fileName: string;
  isPhoto: boolean;
  width: number;
  height: number;
  durationMs?: number;
}) {
  return (
    <Card
      // shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Stack>
        <Text fw={500}>{fileName}</Text>
        <Badge color={isPhoto ? "pink" : "indigo"}>
          {isPhoto ? "Image" : "Video"}
        </Badge>

        {/* <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text> */}

        {/* <Button color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button> */}
      </Stack>
    </Card>
  );
}
