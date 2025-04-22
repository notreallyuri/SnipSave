import { signIn } from "@/modules/auth";
import { createSession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@/schemas";

export async function signInController(req: NextRequest) {
  try {
    const body = await req.json();

    const data = UserSchema.signIn.parse(body);

    const user = await signIn.execute(data);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await createSession.execute(user.id);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
