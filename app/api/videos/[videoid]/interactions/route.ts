import { authOptions } from "@/lib/auth";
import {
  countLikesForVideo,
  createInteraction,
  hasUserLikedVideo,
  listCommentsForVideo,
} from "@/lib/query/query.interaction";
import { createInteractionSchema } from "@/lib/type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// 🔍 Extracts videoid from `/api/videos/[videoid]/interactons`
function extractVideoId(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  const videoIndex = segments.indexOf("videos");
  if (videoIndex !== -1 && segments.length > videoIndex + 1) {
    return segments[videoIndex + 1];
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const videoid = extractVideoId(req);
    if (!videoid) {
      return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
    }

    const comments = await listCommentsForVideo(videoid);
    const likes = await countLikesForVideo(videoid);
    const isLike = await hasUserLikedVideo(session.user.id, videoid);

    return NextResponse.json({
      comments,
      likes,
      isLike: !!isLike,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch interaction data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const videoid = extractVideoId(req);
    if (!videoid) {
      return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = createInteractionSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 422 }
      );
    }

    const interaction = await createInteraction({
      ...result.data,
      user_id: session.user.id,
      video_id: videoid,
    });

    return NextResponse.json(interaction);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create interaction" },
      { status: 500 }
    );
  }
}
