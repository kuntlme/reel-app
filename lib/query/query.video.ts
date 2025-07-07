import { prismaClient } from "../prisma";
import { createVideoInput } from "../type";


// Create a new video
export const createVideo = async (data: createVideoInput & { uploader_id: string }) =>
  await prismaClient.video.create({ data });

// Get a video (with uploader & interactions)
export const getVideo = async (videoid: string) =>
  await prismaClient.video.findUnique({
    where: { videoid },
    include: {
      uploader: true,
      // interactions: {
      //   include: { comment: true, like: true },
      // },
    },
  });

// List videos by user (most-recent first)
export const listVideosByUser = async (uploader_id: string) =>
  await prismaClient.video.findMany({
    where: { uploader_id },
    orderBy: { uploaded_at: 'desc' },
  });

// Update video (e.g. increment viewcount)
export const incrementVideoViews = async (videoid: string) =>
  await prismaClient.video.update({
    where: { videoid },
    data: { viewcount: { increment: 1 } },
  });

// Delete video
export const deleteVideo = async (videoid: string) =>
  await prismaClient.video.delete({ where: { videoid } });



// get list of videos
export const getVideoList = async () =>
  await prismaClient.video.findMany({ 
    orderBy: { uploaded_at: "desc" },
     include: {
      uploader: true
     }
  });