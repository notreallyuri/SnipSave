import { AppError } from "@/lib/errors";
import { userManager, sessionManager } from "@/repository";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const sessionData = await sessionManager.getUserId(req.cookies);

    if (!sessionData)
      return NextResponse.json({ error: "Session not found" }, { status: 401 });

    const user = await userManager.getUser(sessionData);

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const preferences = await userManager.getPreferences(user.id);

    if (!preferences)
      return NextResponse.json(
        { error: "Preferences not found" },
        { status: 404 },
      );

    return NextResponse.json({ preferences });
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

export async function PATCH(req: NextRequest) {
  try {
    const sessionData = await sessionManager.getUserId(req.cookies);
    const body = await req.json();

    if (!sessionData)
      return NextResponse.json({ error: "Session not found" }, { status: 401 });

    const user = await userManager.getUser(sessionData);

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const preferences = await userManager.getPreferences(user.id);

    if (!preferences)
      return NextResponse.json(
        { error: "Preferences not found" },
        { status: 404 },
      );

    await userManager.updatePreferences(user.id, body);

    return NextResponse.json({ success: true });

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
