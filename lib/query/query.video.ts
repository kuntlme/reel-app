import { PrismaClient } from "@/app/generated/prisma";

// Create a new video
export const createVideo = async (data: {
  uploader_id: string;
  description: string;
  sharelink: string;
  viewcount?: number;      // defaults to 0 if you like
  uploaded_at?: Date;      // defaults to now()
}) =>
  await PrismaClient.video.create({ data });