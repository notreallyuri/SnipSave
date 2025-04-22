import { signUp } from "@/modules/auth";
import { createSession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@/schemas";

export async function signUpController(req: NextRequest) {
  try {
    const body = await req.json();

    const data = UserSchema.signUp.parse(body);

    const user = await signUp.execute(data);

    if (!user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    await createSession.execute(user.id);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
