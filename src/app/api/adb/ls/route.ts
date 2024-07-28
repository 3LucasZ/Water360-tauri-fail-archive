import Bluebird from "bluebird";
import Adb from "@devicefarmer/adbkit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const client = Adb.createClient();

  const test = async () => {
    try {
      const devices = await client.listDevices();
      await Bluebird.map(devices, async (device: any) => {
        const files = await client.readdir(
          device.id,
          "/storage/emulated/0/Pictures/SDK_DEMO_EXPORT"
        );
        // Synchronous, so we don't have to care about returning at the
        // right time
        files.forEach((file: any) => {
          if (file.isFile()) {
            console.log(`[${device.id}] Found file "${file.name}"`);
          }
        });
      });
      console.log("Done checking /sdcard files on connected devices");
    } catch (err) {
      console.error("Something went wrong:", err.stack);
    }
  };

  return NextResponse.json({ msg: "ok" }, { status: 200 });
}
