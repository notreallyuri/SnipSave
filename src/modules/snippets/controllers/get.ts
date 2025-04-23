import { getSnippet, getSnippetByAuthor } from "@/modules/snippets";
import { getUserIdBySession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";
import { SnippetSchema } from "@/schemas";

export const getSnippetByIdcontroller = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const snippet = await getSnippet.execute(id);

    if (!snippet) {
      return NextResponse.json(
        { message: "Snippet not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getSnippetByAuthorController = async () => {
  const authorId = await getUserIdBySession.execute();

  if (!authorId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const snippets = await getSnippetByAuthor.execute(authorId);
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
