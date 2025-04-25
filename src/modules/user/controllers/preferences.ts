import { NextRequest, NextResponse } from "next/server";
import { updateUser, getPreferences, updatePreferences } from "@/modules/user";
import { getUserBySession } from "@/modules/session";
import { UserSchema } from "@/schemas";

export async function updateUserPreferencesController(req: NextRequest) {
  try {
    const user = await getUserBySession.execute();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { id } = user;

    const body = await req.json();

    const data = UserSchema.preferences.parse(body);

    const updatedPref = await updatePreferences.execute({ id, data });

    return NextResponse.json(updatedPref, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function getUserPreferencesController() {
  try {
    const user = await getUserBySession.execute();

    if (!user)
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );

    const { id } = user;

    const pref = await getPreferences.execute(id);

    return NextResponse.json(pref, { status: 200 });
  } catch (error) {
    console.error("Error getting user preferences:", error);
    return NextResponse.json(
      { error: "Failed to get user preferences" },
      { status: 500 }
    );
  }
}
