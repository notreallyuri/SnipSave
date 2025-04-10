import { sessionManager } from "@/repository/session.repository";
import { NextRequest, NextResponse } from "next/server";
import { AppError } from "@/lib/errors";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  try {
    const sessionData = await sessionManager.getUserId(await cookies());

    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    await sessionManager.deleteSession(await cookies());

    return NextResponse.json({ message: "Successfully signed out" });
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
