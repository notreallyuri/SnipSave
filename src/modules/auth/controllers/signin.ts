import { signIn } from "@/modules/auth";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema } from "@/schemas";
import { createSession } from "@/modules/session";

export async function signInController(req: NextRequest) {
  try {
    const body = await req.json();

    const data = UserSchema.signIn.parse(body);

    const user = await signIn.execute(data);

    console.log("Data:", {
      user,
      remember: data.remember,
    });

    await createSession.execute({
      user,
      remember: data.remember,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
