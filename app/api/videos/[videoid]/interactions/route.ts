import { authOptions } from "@/lib/auth";
import { createInteraction } from "@/lib/query/query.interaction";
import { createInteractionSchema } from "@/lib/type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { videoid: string } }) {
    try {
        const { videoid } = await params;

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const body = await req.json();
        const result = createInteractionSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: result.error.format() },
                { status: 405 }
            )
        }

        const interaction = await createInteraction({ ...result.data, user_id: session.user.id, video_id: videoid });
        return NextResponse.json(interaction);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create interaction" },
            { status: 500 }
        )
    }

}