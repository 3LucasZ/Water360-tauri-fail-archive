import { settingsDir } from "@/services/constants";
import { isValidIP } from "@/services/mini_helper";
import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { getItem, init } from "node-persist";
import { promisify } from "util";

export async function POST(req: NextRequest) {
  //get IP
  await init({
    dir: settingsDir,
  });
  var IP = await getItem("IP");
  if (!isValidIP(IP)) {
    return NextResponse.json({ msg: "invalid IP" }, { status: 500 });
  }
  if (isValidIP(IP, true)) {
    IP = '"[' + IP + ']"';
  }
  //adb connect <IP>
  const command = promisify(exec);
  const { stdout, stderr } = await command("adb connect " + IP + ":5555");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
  //return
  return NextResponse.json(
    { stdout: "stdout", stderr: "stderr" },
    { status: 200 }
  );
}
