import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const mac = "c8:63:14:74:1f:96";
  console.log("wol:", mac);
  const wol = require("wake_on_lan");
  wol.wake("c8:63:14:74:1f:96");
  return NextResponse.json({ msg: "ok" }, { status: 200 });
}
