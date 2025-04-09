import { NextRequest, NextResponse } from "next/server";
import { authManager } from "@/repository/auth.repository";
import { AppError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await authManager.signIn(body);

    return NextResponse.json({ success: true }, { status: 200 });
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
