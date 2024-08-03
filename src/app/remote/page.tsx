"use client";

import { under360 } from "@/services/api_helper";
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
  Table,
} from "@mantine/core";
import {
  IconDownload,
  IconFileExport,
  IconFileInfo,
  IconInfoCircle,
  IconSearch,
  IconTrash,
  IconTrashOff,
  IconTrashX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  async function getData() {
    setUrls((await (await under360("/ls")).json())["data"]);
  }
  useEffect(() => {
    getData();
  }, []);
  const cards = urls
    .filter((url) => url.toLowerCase().match(search.toLowerCase()))
    .map((url) => {
      const fileName = url.substring(url.lastIndexOf("/") + 1);
      const dateStr = url.split("_")[1];
      const yr = Number(dateStr.substring(0, 4));
      const m = Number(dateStr.substring(4, 6));
      const d = Number(dateStr.substring(6, 8));
      const timeStr = url.split("_")[2];
      const hr = Number(timeStr.substring(0, 2));
      const min = Number(timeStr.substring(2, 4));
      const sec = Number(timeStr.substring(4, 6));
      return (
        <FileCard
          key={url}
          fileName={fileName}
          isPhoto={url.split(".").pop() == "insp"}
          date={m + "/" + d + "/" + yr}
          time={hr + ":" + min + ":" + sec}
        />
      );
    });
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
        {cards}
      </SimpleGrid>
    </Stack>
  );
}
function FileCard({
  fileName,
  isPhoto,
  date,
  time,
  width,
  height,
  durationMs,
}: {
  fileName: string;
  isPhoto: boolean;
  date: string;
  time: string;
  width?: number;
  height?: number;
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
        <Text fw={500} truncate="end">
          {fileName}
        </Text>

        <Badge color={isPhoto ? "pink" : "indigo"}>
          {isPhoto ? "Image" : "Video"}
        </Badge>
        <Text>{date + " " + time}</Text>
        <Button.Group miw={"100%"}>
          <Button color="yellow" variant="light" miw="40" px="0">
            <IconFileInfo stroke={1.5} />
          </Button>
          <Button
            color="blue"
            variant="light"
            fullWidth
            leftSection={<IconDownload stroke={1.5} />}
          >
            Export
          </Button>
          <Button color="red" variant="light" miw="40" px="0">
            <IconTrash stroke={1.5} />
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
