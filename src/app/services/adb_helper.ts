import type { AdbDaemonDevice } from "@yume-chan/adb";
import { AdbPacket, AdbPacketSerializeStream } from "@yume-chan/adb";
import {
  StructDeserializeStream,
  MaybeConsumable,
  WrapReadableStream,
  WrapWritableStream,
} from "@yume-chan/stream-extra";

import { PromiseResolver } from "@yume-chan/async";
import {
  PushReadableStream,
  WritableStream,
  type ReadableStream,
} from "@yume-chan/stream-extra";
import { connect, type Socket } from "node:net";

export interface TCPSocketOptions {
  noDelay?: boolean;
  unref?: boolean;
}

export interface TCPSocketOpenInfo {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;

  remoteAddress: string;
  remotePort: number;

  localAddress: string;
  localPort: number;
}

export class TCPSocket {
  #socket: Socket;
  #opened = new PromiseResolver<TCPSocketOpenInfo>();
  get opened(): Promise<TCPSocketOpenInfo> {
    return this.#opened.promise;
  }

  constructor(
    remoteAddress: string,
    remotePort: number,
    options?: TCPSocketOptions
  ) {
    this.#socket = connect(remotePort, remoteAddress);

    if (options?.noDelay) {
      this.#socket.setNoDelay(true);
    }
    if (options?.unref) {
      this.#socket.unref();
    }

    this.#socket.on("connect", () => {
      const readable = new PushReadableStream<Uint8Array>((controller) => {
        this.#socket.on("data", async (data) => {
          this.#socket.pause();
          await controller.enqueue(data);
          this.#socket.resume();
        });

        this.#socket.on("end", () => {
          try {
            controller.close();
          } catch {}
        });

        controller.abortSignal.addEventListener("abort", () => {
          this.#socket.end();
        });
      });

      this.#opened.resolve({
        remoteAddress,
        remotePort,
        localAddress: this.#socket.localAddress!,
        localPort: this.#socket.localPort!,
        readable,
        writable: new WritableStream({
          write: async (chunk) => {
            return new Promise<void>((resolve, reject) => {
              if (!this.#socket.write(chunk)) {
                this.#socket.once("drain", resolve);
              } else {
                resolve();
              }
            });
          },
          close: async () => {
            this.#socket.end();
          },
        }),
      });
    });

    this.#socket.on("error", (error) => {
      this.#opened.reject(error);
    });
  }
}

export interface AdbDaemonDirectSocketDeviceOptions {
  host: string;
  port?: number;
  name?: string;
  unref?: boolean;
}

export class AdbDaemonDirectSocketsDevice implements AdbDaemonDevice {
  static isSupported(): boolean {
    return true;
  }

  #options: AdbDaemonDirectSocketDeviceOptions;

  readonly serial: string;

  get host(): string {
    return this.#options.host;
  }

  readonly port: number;

  get name(): string | undefined {
    return this.#options.name;
  }

  constructor(options: AdbDaemonDirectSocketDeviceOptions) {
    this.#options = options;
    this.port = options.port ?? 5555;
    this.serial = `${this.host}:${this.port}`;
  }

  async connect() {
    const socket = new TCPSocket(this.host, this.port, {
      noDelay: true,
      unref: this.#options.unref,
    });
    const { readable, writable } = await socket.opened;

    return {
      readable: new WrapReadableStream(readable).pipeThrough(
        new StructDeserializeStream(AdbPacket)
      ),
      writable: new WrapWritableStream(writable)
        .bePipedThroughFrom(new MaybeConsumable.UnwrapStream())
        .bePipedThroughFrom(new AdbPacketSerializeStream()),
    };
  }
}
