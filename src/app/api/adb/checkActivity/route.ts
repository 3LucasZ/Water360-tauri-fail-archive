import { Adb, AdbServerClient, AdbTransport, decodeUtf8 } from "@yume-chan/adb";
import { AdbServerNodeTcpConnector } from "@yume-chan/adb-server-node-tcp";
import { NextRequest, NextResponse } from "next/server";
import { TextDecoderStream, WritableStream } from "@yume-chan/stream-extra";

export async function POST(request: NextRequest) {
  const connector: AdbServerNodeTcpConnector = new AdbServerNodeTcpConnector({
    host: "localhost",
    port: 5037,
  });
  const client: AdbServerClient = new AdbServerClient(connector);
  const selector: AdbServerClient.DeviceSelector = undefined;
  const transport: AdbTransport = await client.createTransport(selector);
  const adb: Adb = new Adb(transport);

  const process = await adb.subprocess.spawn(
    "dumpsys activity activities | grep mResumedActivity"
  );
  await process.stdout.pipeThrough(new TextDecoderStream("UTF8")).pipeTo(
    new WritableStream({
      write(chunk) {
        console.log(chunk);
      },
    })
  );
  await process.kill();

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
