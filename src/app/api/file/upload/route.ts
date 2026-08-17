import { randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const fileName = `${randomUUID()}${path.extname(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, fileName), buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}

export async function DELETE(request: Request) {
  const { url } = await request.json();

  if (typeof url !== "string") {
    return NextResponse.json({ error: "Некорректный url" }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const fileName = path.basename(url);
  const filePath = path.join(uploadsDir, fileName);

  if (path.dirname(filePath) !== uploadsDir) {
    return NextResponse.json({ error: "Некорректный url" }, { status: 400 });
  }

  try {
    await unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  return NextResponse.json({ success: true });
}
