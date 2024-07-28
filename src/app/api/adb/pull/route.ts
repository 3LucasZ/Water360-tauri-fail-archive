import { Adb, AdbServerClient, AdbSync, AdbTransport } from "@yume-chan/adb";
import { AdbServerNodeTcpConnector } from "@yume-chan/adb-server-node-tcp";
import { NextRequest, NextResponse } from "next/server";
import { WritableStream } from "@yume-chan/stream-extra";
import fsPromises from "node:fs/promises";
import fs from "fs";
import { write } from "node:fs";

export async function POST(request: NextRequest) {
  const connector: AdbServerNodeTcpConnector = new AdbServerNodeTcpConnector({
    host: "localhost",
    port: 5037,
  });
  const client: AdbServerClient = new AdbServerClient(connector);
  const selector: AdbServerClient.DeviceSelector = undefined;
  const transport: AdbTransport = await client.createTransport(selector);
  const adb: Adb = new Adb(transport);
  const sync: AdbSync = await adb.sync();

  const fileName = "IMG_20230621_051555_00_002.jpg";

  console.log("pull:");
  const content = sync.read(
    "/storage/emulated/0/Pictures/SDK_DEMO_EXPORT/" + fileName
  );
  let exists = await fsPromises
    .access(fileName)
    .then(() => true)
    .catch(() => false);
  console.log(exists);
  var writeStream = fs.createWriteStream(fileName, { flags: "w" });

  await content.pipeTo(
    new WritableStream({
      write(chunk) {
        writeStream.write(chunk);
      },
    })
  );

  writeStream.close();
  return NextResponse.json({ message: "ok" }, { status: 200 });
}
