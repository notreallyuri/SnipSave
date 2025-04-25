import { signUp } from "@/modules/auth";
import { NextRequest, NextResponse } from "next/server";
import { UserSchema, UserSchemaTypes } from "@/schemas";
import { createSession } from "@/modules/session";

export async function signUpController(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Body:", body);

    const { remember, confirmPassword, ...userData } =
      body as UserSchemaTypes["signUp"];

    const { data, error } = UserSchema.create.safeParse(userData);

    if (error) {
      return NextResponse.json(
        { error: "Invalid data", details: error.flatten() },
        { status: 422 },
      );
    }

    const user = await signUp.execute(data);

    if (!user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    await createSession.execute({
      user,
      remember
    });

    console.log("User created and session created:", user.id);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
