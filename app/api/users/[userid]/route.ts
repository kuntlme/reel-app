import { authOptions } from "@/lib/auth";
import { deleteUser, getUserById, updateUser } from "@/lib/query/query.user";
import { updateUserInput, updateUserSchema } from "@/lib/type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

// export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
//     try {
//         const { userid } = await params;
//         const user = await getUserById(userid);
//         console.log(user);
//         return NextResponse.json(
//             { user },
//             { status: 200 }
//         )
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(
//             { error: "Falied to get user profile" },
//             { status: 500 }
//         )
//     }
// }

export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
    try {
        const session = await getServerSession(authOptions);
        const { userid } = await params;

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        // const userid = session.user.id;
        const user = await getUserById(userid);
        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }
        return NextResponse.json(
            {
                user: {
                    email: user.email,
                    userid: user.userid,
                    password: user.password,
                    profilename: user.profilename,
                    username: user.username,
                    joining_date: user.joining_date,
                    location: user.location,
                    creator: user?.creator,
                    viewer : user?.viewer
                },
                videos: user.videos
            },
            { status: 200 }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Falied to get user profile" },
            { status: 500 }
        )
    }
}

export async function PUT(req: NextRequest, { params }: { params: { userid: string } }) {
    try {
        const { userid } = await params;
        const body = await req.json();
        const result = updateUserSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.format() },
                { status: 405 }
            )
        }

        const userData: updateUserInput = result.data;

        const user = await updateUser(userid, userData);
        console.log(user);
        return NextResponse.json(
            { user },
            { status: 200 }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Falied to update user profile" },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { userid: string } }) {
    try {
        const { userid } = await params;

        const user = await deleteUser(userid);
        console.log(user);
        return NextResponse.json(
            { user },
            { status: 200 }
        )
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Falied to delete user" },
            { status: 500 }
        )
    }
}