import { NextRequest, NextResponse } from "next/server";
import { promise, sys } from "ping";

import { getItem, init } from "node-persist";
export async function POST(request: NextRequest) {
  await init({
    dir: "relative/path/to/persist",
  });
  let IP = await getItem("IP");
  const pingable = (await promise.probe(IP)).alive;
  return NextResponse.json({ pingable }, { status: 200 });
}
