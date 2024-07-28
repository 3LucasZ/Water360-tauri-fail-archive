import { AdbServerClient } from "@yume-chan/adb";
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
  return NextResponse.json({ message: "ok" }, { status: 200 });
}
