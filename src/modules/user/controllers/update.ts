import { getUserIdBySession } from "@/modules/session/factory";
import { NextResponse, NextRequest } from "next/server";
import { updateUser } from "@/modules/user/factory";
import { UserSchema } from "@/schemas";

export async function updateUserController(req: NextRequest) {
  try {
    const id = await getUserIdBySession.execute();

    if (!id)
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );

    const body = await req.json();

    const data = UserSchema.update.parse(body);

    const updatedUser = await updateUser.execute({ id, data });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
