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
  ActionIcon,
  Flex,
  Grid,
  Box,
  Container,
  TextInput,
} from "@mantine/core";
import {
  IconDownload,
  IconFileExport,
  IconSearch,
  IconTrash,
  IconTrashOff,
  IconTrashX,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <Stack>
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<IconSearch />}
        placeholder="File name"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}>
        <FileCard
          fileName={"super-long-file-name-to-test.jpg"}
          isPhoto={false}
          width={0}
          height={0}
          durationMs={1000}
        />
      </SimpleGrid>
    </Stack>
  );
}
function FileCard({
  fileName,
  isPhoto,
  width,
  height,
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
      // padding="lg"
      radius="md"
      withBorder
    >
      <Stack>
        <Text fw={500}>{fileName}</Text>

        <Badge color={isPhoto ? "pink" : "indigo"}>
          {isPhoto ? "Image" : "Video"}
        </Badge>
        <Button.Group miw={"100%"}>
          <Button color="blue" fullWidth leftSection={<IconDownload />}>
            Export
          </Button>
          <Button color="red" miw="40" px="0">
            <IconTrash />
          </Button>
        </Button.Group>

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
