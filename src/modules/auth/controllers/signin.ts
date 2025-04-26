import { signIn } from "@/modules/auth";
import { NextRequest, NextResponse } from "next/server";
import { AppError } from "@/lib/errors";
import { SignInSchema } from "@/schemas";
import { createSession } from "@/modules/session";

export async function signInController(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = SignInSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { error: "Invalid data", details: error.flatten() },
        { status: 422 },
      );
    }

    const { remember, ...rest } = data;

    const user = await signIn.execute(rest);

    console.log("Data:", {
      user,
      remember,
    });

    await createSession.execute({
      user,
      remember,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error signing in:", error);

    if (error instanceof AppError) {
      console.error("Error message:", error.message);

      return NextResponse.json(
        { error: error.message, details: error.meta },
        { status: error.httpStatus },
      );
    }

    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}
