import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const protocol = "http";
  const host = "2600:1700:bd80:1cb0:129:b4e0:5b6e:9aa2";
  const port = 8080;
  const data = await request.json();
  const call = protocol + "://" + "[" + host + "]:" + port + data.path;
  console.log("under360:", call);

  const res = await fetch(call, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const resJson = await res.json();
  console.log(resJson);

  return NextResponse.json(resJson, { status: res.status });
}
