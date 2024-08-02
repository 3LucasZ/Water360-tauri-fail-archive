import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  const { stdout, stderr } = await exec("adb connect");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
