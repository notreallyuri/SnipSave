import { createSnippet, updateSnippet } from "@/modules/snippets";
import { NextRequest, NextResponse } from "next/server";
import { SnippetSchema, UpdateSnippetSchema } from "@/schemas";

interface ById {
  req: NextRequest;
  params: { id: string };
}

export const updateSnippetController = async ({ req, params }: ById) => {
  const id = params.id;

  const body = await req.json();

  const { data, error } = UpdateSnippetSchema.safeParse(body);

  if (error) {
    return NextResponse.json(
      { message: "Invalid data", issues: error.format() },
      { status: 400 },
    );
  }

  try {
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
