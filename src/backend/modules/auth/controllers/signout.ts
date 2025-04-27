import { NextResponse } from "next/server";
import { destroySession } from "@/backend/modules/session";

export async function signOutController() {
  try {
    await destroySession.execute();

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
