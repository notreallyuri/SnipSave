import { getUserBySession } from "@/modules/session/factory";
import { NextResponse, NextRequest } from "next/server";
import { updateUser, updateUserProfilePicture } from "@/modules/user/factory";
import { UserSchema, UpdateUserSchema } from "@/schemas";

export async function updateUserController(req: NextRequest) {
  try {
    const user = await getUserBySession.execute();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const { id } = user;

    const body = await req.json();

    const { data, error } = UpdateUserSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { error: "Invalid data", details: error.format() },
        { status: 400 },
      );
    }

    await updateUser.execute({ id, data });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

export async function updateUserProfilePictureController(req: NextRequest) {
  try {
    const user = await getUserBySession.execute();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const { id } = user;

    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    await updateUserProfilePicture.execute({ id, url });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile picture:", error);
    return NextResponse.json(
      { error: "Failed to update user profile picture" },
      { status: 500 },
    );
  }
}
