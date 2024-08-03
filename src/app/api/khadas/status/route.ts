import { Adb, AdbServerClient, AdbTransport, decodeUtf8 } from "@yume-chan/adb";
import { AdbServerNodeTcpConnector } from "@yume-chan/adb-server-node-tcp";
import { NextRequest, NextResponse } from "next/server";
import { TextDecoderStream, WritableStream } from "@yume-chan/stream-extra";
import { getItem, init } from "node-persist";
import { settingsDir } from "@/services/constants";
import { promise } from "ping";

export async function POST(request: NextRequest) {
  //---Template---
  const connector: AdbServerNodeTcpConnector = new AdbServerNodeTcpConnector({
    host: "localhost",
    port: 5037,
  });
  const client: AdbServerClient = new AdbServerClient(connector);
  const selector: AdbServerClient.DeviceSelector = undefined;
  var process;
  //---Status---
  //-pingable-
  var pingable = false;
  await init({
    dir: settingsDir,
  });
  let IP = await getItem("IP");
  pingable = (await promise.probe(IP, { timeout: 1 })).alive;
  //-connected-
  const transport: AdbTransport = await client.createTransport(selector);
  const adb: Adb = new Adb(transport);

  //-running-
  var running = false;
  process = await adb.subprocess.spawn(
    "dumpsys activity activities | grep mResumedActivity"
  );
  await process.stdout.pipeThrough(new TextDecoderStream("UTF8")).pipeTo(
    new WritableStream({
      write(chunk) {
        // console.log(chunk);
        if (chunk.includes("360")) {
          running = true;
        }
      },
    })
  );
  await process.kill();

  return NextResponse.json({ pingable, running }, { status: 200 });
}
