import { signIn } from "@/modules/auth";
import { createSession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@/schemas";
import { cookies } from "next/headers";
import { COOKIE_SESSION_KEY, SESSION_EXPIRATION_SECONDS } from "@/config";

export async function signInController(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();

    const data = UserSchema.signIn.parse(body);

    const user = await signIn.execute(data);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
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

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
