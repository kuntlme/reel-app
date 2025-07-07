// app/api/users/[userid]/route.ts

import { authOptions } from "@/lib/auth";
import { deleteUser, getUserById, updateUser } from "@/lib/query/query.user";
import { updateUserInput, updateUserSchema } from "@/lib/type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Utility to pull the last segment off a NextRequest URL
function extractUserId(req: NextRequest): string | null {
  const parts = req.nextUrl.pathname.split("/");
  const userid = parts.pop();
  return userid && userid !== "[userid]" ? userid : null;
}

export async function GET(req: NextRequest) {
  const userid = extractUserId(req);
  if (!userid) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserById(userid);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
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
        creator: user.creator,
        viewer: user.viewer,
      },
      videos: user.videos,
    },
    { status: 200 }
  );
}

export async function PUT(req: NextRequest) {
  const userid = extractUserId(req);
  if (!userid) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const body = await req.json();
  const result = updateUserSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.format() },
      { status: 422 }
    );
  }

  const updated = await updateUser(userid, result.data as updateUserInput);
  return NextResponse.json({ user: updated }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const userid = extractUserId(req);
  if (!userid) {
    return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
  }

  const deleted = await deleteUser(userid);
  return NextResponse.json({ user: deleted }, { status: 200 });
}
