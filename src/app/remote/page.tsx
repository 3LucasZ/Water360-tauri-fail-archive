"use client";

import { under360 } from "@/services/api_helper";
import { formatSize } from "@/services/mini_helper";
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
  Modal,
  List,
  LoadingOverlay,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
    .filter(
      (url) =>
        url.toLowerCase().match(search.toLowerCase()) && !url.match("LRV")
    )
    .map((url) => {
      const fileName = url.substring(url.lastIndexOf("/") + 1);
      const fileType =
        url.split(".").pop() == "insp"
          ? 1
          : fileName.substring(0, 3) == "LRV"
          ? 3
          : 2;
      const dateStr = url.split("_")[1];
      const yr = Number(dateStr.substring(0, 4));
      const m = Number(dateStr.substring(4, 6));
      const d = Number(dateStr.substring(6, 8));
      const timeStr = url.split("_")[2];
      const hr = Number(timeStr.substring(0, 2));
      const min = Number(timeStr.substring(2, 4));
      const sec = Number(timeStr.substring(4, 6));
      const date = new Date(Date.UTC(yr, m, d, hr, min, sec));
      return (
        <FileCard
          key={url}
          filePath={url}
          fileName={fileName}
          fileType={fileType}
          date={date.toLocaleString()}
          refresh={getData}
        />
      );
    });
  return (
    <>
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
    </>
  );
}
function FileCard({
  refresh,
  filePath,
  fileName,
  fileType,
  date,
}: {
  refresh: Function;
  filePath: string;
  fileName: string;
  fileType: number;
  date: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState({
    height: 0,
    width: 0,
    fileSize: 0,
    fps: 0,
    durationInMs: 0,
    bitrate: 0,
    creationTime: 0,
  });
  useEffect(() => {
    under360("/inspect", { url: filePath }).then((res) =>
      res.json().then((json) => setData(json))
    );
  }, []);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isDeleting}
        zIndex={1000}
        overlayProps={{
          radius: "sm",
          blur: 2,
        }}
      />
      <Card radius="md" withBorder>
        <Stack>
          <Text fw={500} truncate="end">
            {fileName}
          </Text>

          <Badge
            color={
              fileType == 1 ? "indigo" : fileType == 2 ? "grape" : "violet"
            }
          >
            {fileType == 1 ? "IMAGE" : fileType == 2 ? "VIDEO" : "TMP"}
          </Badge>
          <Text>{date}</Text>
          <Button.Group miw={"100%"}>
            <Button
              color="yellow"
              variant="light"
              miw="40"
              px="0"
              onClick={async () => {
                open();
              }}
            >
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
            <Button
              color="red"
              variant="light"
              miw="40"
              px="0"
              onClick={async () => {
                await under360("/rm", { url: filePath });
                setIsDeleting(true);
                setTimeout(() => {
                  setIsDeleting(false);
                  refresh();
                }, 5000);
              }}
            >
              <IconTrash stroke={1.5} />
            </Button>
          </Button.Group>
        </Stack>
      </Card>
      <Box pos="relative">
        <LoadingOverlay
          visible={data.height == 0}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Modal
          opened={opened}
          onClose={close}
          title="File Information"
          centered
        >
          <List>
            <List.Item>
              Resolution: {data.height} x {data.width}
            </List.Item>
            <List.Item hidden={fileType == 1}>FPS: {data.fps}</List.Item>
            <List.Item hidden={fileType == 1}>
              Duration: {data.durationInMs / 1000}
            </List.Item>
            <List.Item hidden={fileType == 1}>
              Bitrate: {formatSize(data.bitrate)}
            </List.Item>
            <List.Item>Filesize: {formatSize(data.fileSize)}</List.Item>
            <List.Item>
              Timestamp: {new Date(data.creationTime).toLocaleString()}
            </List.Item>
          </List>
        </Modal>
      </Box>
    </Box>
  );
}
