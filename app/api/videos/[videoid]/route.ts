import { authOptions } from "@/lib/auth";
import { deleteVideo, getVideo } from "@/lib/query/query.video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: { videoid: string } }) {
    try {
        const { videoid } = await params;

        const video = await getVideo(videoid);

        return NextResponse.json(video);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        )
    }

}

export async function DELETE(req: NextRequest,{ params }: { params: { videoid: string } }) {
    try {
        const { videoid } = await params;
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const video = await getVideo(videoid);

        if(session.user.id != video?.uploader_id){
            return NextResponse.json(
                { error: "Unauthorized to delete video" },
                { status: 401 }
            )
        }

        const deletedVideo = await deleteVideo(videoid);

        return NextResponse.json({deletedVideo: deletedVideo});
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to delete videos" },
            { status: 500 }
        )
    }

}