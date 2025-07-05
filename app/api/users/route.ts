import { getUserList } from "@/lib/query/query.user"
import { getSession } from "next-auth/react"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const users = await getUserList();
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'error in get videos' },
            { status: 500 }
        )
    }
}
