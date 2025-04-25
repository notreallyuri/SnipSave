import { signUp } from "@/modules/auth";
import { NextRequest, NextResponse } from "next/server";
import { SignUpSchema } from "@/schemas";
import { createSession } from "@/modules/session";

export async function signUpController(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = SignUpSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { error: "Invalid data", details: error.flatten() },
        { status: 422 },
      );
    }

    const { remember, ...rest } = data;

    const user = await signUp.execute(rest);

    await createSession.execute({
      user,
      remember,
    });

    console.log("User created and session created:", user.id);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
