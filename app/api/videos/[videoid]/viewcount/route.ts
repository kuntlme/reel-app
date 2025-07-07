import { incrementVideoViews } from "@/lib/query/query.video";
import { NextRequest, NextResponse } from "next/server";

// Helper to extract the videoid from the URL
function extractVideoId(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split("/");
  const videoIndex = segments.indexOf("videos");
  if (videoIndex !== -1 && segments.length > videoIndex + 1) {
    return segments[videoIndex + 1];
  }
  return null;
}

export async function PUT(req: NextRequest) {
  try {
    const videoid = extractVideoId(req);
    if (!videoid) {
      return NextResponse.json({ error: "Video ID not found in URL" }, { status: 400 });
    }

    const updatedViewCount = await incrementVideoViews(videoid);

    return NextResponse.json(updatedViewCount);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to increment video view count" },
      { status: 500 }
    );
  }
}
