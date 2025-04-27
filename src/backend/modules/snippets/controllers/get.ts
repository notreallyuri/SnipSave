import { getSnippet } from "@/backend/modules/snippets";
import { NextRequest, NextResponse } from "next/server";

export const getSnippetByIdcontroller = async (
  req: NextRequest,
  { params }: { params: { id: string } },
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
        { status: 404 },
      );
    }

    return NextResponse.json(snippet, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};

export const getSnippetByAuthorController = async () => {
  try {
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
