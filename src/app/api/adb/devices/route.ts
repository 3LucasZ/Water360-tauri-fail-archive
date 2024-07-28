import { Adb, AdbServerClient, AdbSync, AdbTransport } from "@yume-chan/adb";
import { AdbServerNodeTcpConnector } from "@yume-chan/adb-server-node-tcp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const connector: AdbServerNodeTcpConnector = new AdbServerNodeTcpConnector({
    host: "localhost",
    port: 5037,
  });

  const client: AdbServerClient = new AdbServerClient(connector);

  const devices = await client.getDevices();
  console.log(devices);

  const selector: AdbServerClient.DeviceSelector = undefined;
  const deviceFeatures = await client.getDeviceFeatures(selector);
  console.log(deviceFeatures);

  const transport: AdbTransport = await client.createTransport(selector);
  const adb: Adb = new Adb(transport);

  const sync: AdbSync = await adb.sync();

  console.log("files");
  const files = await sync.readdir(
    "/storage/emulated/0/Pictures/SDK_DEMO_EXPORT"
  );
  for (const file of files) {
    console.log(file.name);
  }

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
