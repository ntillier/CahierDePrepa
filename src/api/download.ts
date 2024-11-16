import request from "@/core/request";
import { Readable } from "stream";

export const download = (session: InstanceSession, id: number) => {
  return new Promise(async (resolve) => {
    const res = await request(session, `/download.php?id=${id}`);
    const blob = await res.blob();
    resolve(blob);
  });
};

export const downloadToStream = (
  session: InstanceSession,
  id: number,
  stream: WritableStream,
): Promise<void> => {
  return new Promise(async (resolve) => {
    const res = await request(session, `/download.php?id=${id}`);
    if (res.body && res.ok) {
      // @ts-ignore
      Readable.fromWeb(res.body).pipe(stream);
    }
    resolve();
  });
};
