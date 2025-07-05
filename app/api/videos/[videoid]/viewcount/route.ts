import { incrementVideoViews } from "@/lib/query/query.video";
import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest, { params }: { params: { videoid: string } }) {
    try {
        const { videoid } = await params;
        const viewcount = await incrementVideoViews(videoid);
        return NextResponse.json(viewcount);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create interaction" },
            { status: 500 }
        )
    }
}