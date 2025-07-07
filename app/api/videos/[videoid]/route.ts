import { authOptions } from "@/lib/auth";
import { deleteVideo, getVideo } from "@/lib/query/query.video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Helper to extract video ID from the request URL
function extractVideoId(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  const videoIndex = segments.indexOf("videos");
  if (videoIndex !== -1 && segments.length > videoIndex + 1) {
    return segments[videoIndex + 1];
  }
  return null;
}

// GET /api/videos/[videoid]
export async function GET(req: NextRequest) {
  try {
    const videoid = extractVideoId(req);
    if (!videoid) {
      return NextResponse.json({ error: "Video ID not found" }, { status: 400 });
    }

    const video = await getVideo(videoid);
    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}

// DELETE /api/videos/[videoid]
export async function DELETE(req: NextRequest) {
  try {
    const videoid = extractVideoId(req);
    if (!videoid) {
      return NextResponse.json({ error: "Video ID not found" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const video = await getVideo(videoid);
    if (session.user.id !== video?.uploader_id) {
      return NextResponse.json({ error: "Not allowed to delete this video" }, { status: 403 });
    }

    const deletedVideo = await deleteVideo(videoid);
    return NextResponse.json({ deletedVideo });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
  }
}
