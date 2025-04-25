import { createSnippet } from "@/modules/snippets";
import { NextRequest, NextResponse } from "next/server";
import { SnippetSchema } from "@/schemas";

export const createSnippetController = async (req: NextRequest) => {
  const body = await req.json();

  const { data, error } = SnippetSchema.safeParse(body);

  if (error) {
    return NextResponse.json(
      { message: "Invalid data", issues: error.format() },
      { status: 400 }
    );
  }

  try {
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
