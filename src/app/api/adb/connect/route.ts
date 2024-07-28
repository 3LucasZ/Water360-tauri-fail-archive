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
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  const { stdout, stderr } = await exec("adb devices");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
