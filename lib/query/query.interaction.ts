import { PrismaClient } from "@/app/generated/prisma";
import { createInteractionInput } from "../type";
const prismaClient = new PrismaClient();

// Common helper
export async function createInteraction(data: createInteractionInput & {
  user_id: string,
  video_id: string
}) {
  // 1) Create Interaction row
  const interaction = await prismaClient.interaction.create({
    data: {
      user_id: data.user_id,
      video_id: data.video_id,
      interaction_at: new Date(),
      type: data.type,
      comment: data.type === 'comment'
        ? { create: { comment_text: data.comment_text! } }
        : undefined,
      like: data.type === 'like' ? { create: {} } : undefined,
    },
  });

  // 2) Upsert Viewer.total_interactions
  await prismaClient.viewer.upsert({
    where: { userid: data.user_id },
    update: { total_interactions: { increment: 1 } },
    create: { userid: data.user_id, total_interactions: 1 },
  });

  return interaction;
}

// All comments on a video (with user info)
export const listCommentsForVideo = async (video_id: string) =>
  await prismaClient.comment.findMany({
    where: { interaction: { video_id, type: 'comment' } },
    include: { interaction: { include: { user: true } } },
  });

// Count likes on a video
export const countLikesForVideo = async (video_id: string) =>
  await prismaClient.like.count({
    where: { interaction: { video_id, type: 'like' } },
  });

// Check if given user liked a video
export const hasUserLikedVideo = async (user_id: string, video_id: string) =>
  await prismaClient.like.findFirst({
    where: { interaction: {video_id, user_id}},
  });

// Top 5 active viewers
export const getTopActiveViewers = async () =>
  await prismaClient.viewer.findMany({
    orderBy: { total_interactions: 'desc' },
    take: 5,
    include: { user: true },
  });

// Top 5 creators
export const getTopCreators = async () =>
  await prismaClient.creator.findMany({
    orderBy: { total_videos_uploaded: 'desc' },
    take: 5,
    include: { user: true },
  });




// Increment creator’s total_videos_uploaded when uploading a video
export const bumpCreatorCount = async (uploader_id: string) =>
  await prismaClient.creator.upsert({
    where: { userid: uploader_id },
    update: { total_videos_uploaded: { increment: 1 } },
    create: { userid: uploader_id, total_videos_uploaded: 1 },
  });

// Fetch Creator stats for a user
export const getCreatorStats = (userid: string) =>
  prismaClient.creator.findUnique({ where: { userid } });

// Fetch Viewer stats for a user
export const getViewerStats = (userid: string) =>
  prismaClient.viewer.findUnique({ where: { userid } });