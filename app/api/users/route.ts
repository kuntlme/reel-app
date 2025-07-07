import { getUserList } from "@/lib/query/query.user";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const users = await getUserList();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'error in get videos' },
            { status: 500 }
        )
    }
}


