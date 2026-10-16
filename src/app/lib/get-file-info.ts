import { File } from "expo-file-system";

type FileInfo = {
  readonly name: string;
  readonly size: number;
  readonly type: "image/jpeg" | "audio/m4a";
};

export async function getFileInfo(fileUri: string): Promise<FileInfo> {
  const fileInfo = new File(fileUri).info();

  const filename = fileUri.split("/").pop();

  if (!fileInfo.exists || !fileInfo.size || !filename) {
    throw new Error(`${fileUri}: file does not exist`);
  }

  const type = filename.endsWith(".jpg") ? "image/jpeg" : "audio/m4a";

  return {
    name: filename,
    size: fileInfo.size,
    type,
  } as const;
}
