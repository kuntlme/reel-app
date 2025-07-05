import { authOptions } from "@/lib/auth";
import { bumpCreatorCount } from "@/lib/query/query.interaction";
import { createVideo, getVideo, getVideoList } from "@/lib/query/query.video";
import { createVideoSchema } from "@/lib/type";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const videos = await getVideoList();
        if (!videos || videos.length == 0) {
            return NextResponse.json([], { status: 200 })
        }
        return NextResponse.json(videos);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const userid = session.user.id;
        const body = await request.json();
        const result = createVideoSchema.safeParse(body);
        if(!result.success){
            return NextResponse.json(
                {error: result.error.format()},
                {status: 405}
            )
        }

        const video = await createVideo({...result.data, uploader_id: userid});

        const creator = await bumpCreatorCount(userid);


        return NextResponse.json({video: video, creator: creator});
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to create a video" },
            { status: 401 }
        )
    }
}