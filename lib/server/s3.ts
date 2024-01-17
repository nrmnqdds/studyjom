"use server";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY as string,
  },
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = file;

  // Check file size
  const fileSizeInBytes = fileBuffer.byteLength;
  const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  console.log("fileSizeInMB: ", fileSizeInMB);
  if (fileSizeInMB > 2) {
    throw new Error("File size is too large");
  }

  const resizedFile = fileBuffer;

  // let resizedFile = fileBuffer;
  // if (fileSizeInMB > 0.2) {
  //   // Resize image if file size is greater than 200KB
  //   resizedFile = await sharp(fileBuffer)
  //     .resize(1000, 1000, {
  //       fit: "inside",
  //       withoutEnlargement: true,
  //     })
  //     .withMetadata()
  //     .toFormat("webp", { quality: 80 })
  //     .toBuffer();
  // }

  // const resizedFileSizeInBytes = resizedFile.byteLength;
  // const resizedFileSizeInMB = resizedFileSizeInBytes / (1024 * 1024);
  // console.log("resizedFileSizeInMB: ", resizedFileSizeInMB);

  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
    Key: `${Date.now()}-${fileName}`,
    Body: resizedFile,
    ContentType: "*/*",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return params.Key;
}

export async function UploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    // Revalidate cache
    revalidatePath("/");

    return `https://istudy-bucket2.s3.ap-southeast-1.amazonaws.com/${fileName}`;
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Error uploading file");
  }
}

export async function DeleteFile(fileName: string) {
  try {
    if (!fileName) {
      throw new Error("No file");
    }

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
      Key: fileName,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    return true;
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Error deleting file");
  }
}
