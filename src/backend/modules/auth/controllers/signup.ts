import { signUp } from "@/backend/modules/auth";
import { NextRequest, NextResponse } from "next/server";
import { SignUpSchema } from "@/schemas";
import { createSession } from "@/backend/modules/session";
import { AppError } from "@/lib/errors";

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
    if (error instanceof AppError) {
      console.error("Error message:", error.message);

      return NextResponse.json(
        { error: error.message, details: error.meta },
        { status: error.httpStatus },
      );
    }

    console.error("Error signing up:", error);
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 });
  }
}
