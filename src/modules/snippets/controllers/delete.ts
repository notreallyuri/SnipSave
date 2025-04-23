import { deleteSnippet } from "@/modules/snippets";
import { getUserIdBySession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";

interface ById {
  req: NextRequest;
  params: { id: string };
}

export const deleteSnippetController = async ({ req, params }: ById) => {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: "ID Not Found" }, { status: 404 });
  }

  try {
    const authorId = await getUserIdBySession.execute();

    if (!authorId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await deleteSnippet.execute({ id, authorId });

    return NextResponse.json({ message: "Snippet deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
