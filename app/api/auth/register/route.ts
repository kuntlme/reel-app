import { NextRequest, NextResponse } from "next/server";
import { CreateUserInput, createUserSchema } from "@/lib/type";
import { createUser } from "@/lib/query/query.user";

export async function POST(request: NextRequest) {

    try {
        const body = await request.json();
        const result = createUserSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.format() },
                { status: 405 },
            )
        }

        const userData: CreateUserInput = result.data;

        const user = await createUser(userData);

        if(!user){
            return NextResponse.json(
                { error: "user not created" },
                { status: 405 },
            )
        }

        return NextResponse.json(
            { message: "User registered successfully", user },
            { status: 200 }
        )
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Falied to User registered" },
            { status: 500 }
        )
    }
}