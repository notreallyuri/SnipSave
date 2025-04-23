import { cookies } from "next/headers";
import { deleteSession } from "@/modules/session";
import { NextResponse } from "next/server";
import { COOKIE_SESSION_KEY } from "@/config";

export async function signOutController() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(COOKIE_SESSION_KEY)?.value;

    if (!sessionId) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    console.log("Signing out session:", sessionId);
    await deleteSession.execute(sessionId);
    cookieStore.delete(COOKIE_SESSION_KEY);

    return NextResponse.json(
      { message: "Signed out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error signing out:", error);
    return NextResponse.json(
      { error: "Failed to sign out API" },
      { status: 500 }
    );
  }
}
