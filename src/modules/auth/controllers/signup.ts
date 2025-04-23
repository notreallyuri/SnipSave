import { signUp } from "@/modules/auth";
import { createSession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@/schemas";
import { cookies } from "next/headers";
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from "@/config";

export async function signUpController(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    console.log("Body:", body);

    const data = UserSchema.create.parse(body);

    console.log("Validated Data:", data);

    const user = await signUp.execute(data);

    if (!user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const token = await createSession.execute(user.id);

    cookieStore.set(COOKIE_SESSION_KEY, token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRATION_SECONDS,
    });

    console.log("User created and session created:", user.id);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
