import { getBaseUserData, getUserById } from "../factory";
import { getUserIdBySession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";

export async function getUserByIdController(req: NextRequest) {
  try {
    const { id } = await req.json();

    const user = await getUserById.execute(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error getting user by id:", error);
    return NextResponse.json(
      { error: "Failed to get user by id" },
      { status: 500 }
    );
  }
}

export async function getCurrentUserController() {
  try {
    const id = await getUserIdBySession.execute();

    if (!id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const user = await getBaseUserData.execute(id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error getting base user data:", error);
    return NextResponse.json(
      { error: "Failed to get base user data" },
      { status: 500 }
    );
  }
}
