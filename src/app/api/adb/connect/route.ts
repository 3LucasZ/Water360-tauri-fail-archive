import { AdbDaemonDirectSocketsDevice } from "@/app/services/adb_helper";
import {
  Adb,
  AdbPacketData,
  AdbPacketInit,
  AdbServerClient,
} from "@yume-chan/adb";
import { AdbServerNodeTcpConnector } from "@yume-chan/adb-server-node-tcp";
import { Consumable } from "@yume-chan/stream-extra";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const device: AdbDaemonDirectSocketsDevice = new AdbDaemonDirectSocketsDevice(
    {
      host: "[2600:1700:bd80:1cb0:129:b4e0:5b6e:9aa2]",
      port: 5555,
    }
  );

  const connection: ReadableWritablePair<
    AdbPacketData,
    Consumable<AdbPacketInit>
  > = await device.connect();

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
