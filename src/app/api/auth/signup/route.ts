import { signUpSchema } from "@/models/auth.schemas";
import { authManager } from "@/repository/auth.repository";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AppError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await authManager.create(body);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: err.message, issues: err.meta },
        { status: err.httpStatus },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
