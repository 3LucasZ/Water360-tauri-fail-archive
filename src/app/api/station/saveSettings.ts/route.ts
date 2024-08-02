import { NextRequest, NextResponse } from "next/server";
import { promise, sys } from "ping";

import { getItem, init, setItem } from "node-persist";
import { settingsDir } from "@/services/constants";
export async function POST(request: NextRequest) {
  console.log("saveSettings");
  // //save settings
  // const data = await request.json();
  // console.log(data);
  // await init({
  //   dir: settingsDir,
  // });
  // await setItem("IP", data["IP"]);
  // await setItem("MAC", data["MAC"]);
  // await setItem("downloadsDir", data["downloadsDir"]);
  // await setItem("RTMP", data["RTMP"]);
  //response
  return NextResponse.json({ msg: "ok" }, { status: 200 });
}
