import { NextResponse } from "next/server";
import { userManager } from "@/repository/user.repository";
import { sessionManager } from "@/repository/session.repository";
import { cookies } from "next/headers";
import { AppError } from "@/lib/errors";

export async function GET() {
  try {
    const sessionData = await sessionManager.getUserSession(await cookies());

    if (!sessionData) {
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    const user = await userManager.get(sessionData);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
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
