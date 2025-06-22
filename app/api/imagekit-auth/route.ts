import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const authenticationParameters = getUploadAuthParams({
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
      privateKey: process.env.PRIVATE_KEY as string,
    });
    return NextResponse.json({
      authenticationParameters,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { error: "ImageKit auth failed" },
      { status: 500 }
    )
  }
}

