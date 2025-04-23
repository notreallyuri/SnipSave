import { createSnippet } from "@/modules/snippets";
import { getUserIdBySession } from "@/modules/session";
import { NextRequest, NextResponse } from "next/server";
import { SnippetSchema } from "@/schemas";

export const createSnippetController = async (req: NextRequest) => {
  const authorId = await getUserIdBySession.execute();

  if (!authorId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { data, error } = SnippetSchema.create.safeParse(body);

  if (error) {
    return NextResponse.json(
      { message: "Invalid data", issues: error.format() },
      { status: 400 }
    );
  }

  try {
    const snippet = await createSnippet.execute({
      authorId,
      data,
    });

    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
