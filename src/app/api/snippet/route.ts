import {
  createSnippetController,
  getSnippetByAuthorController,
} from "@/modules/snippets/controllers";

export const POST = createSnippetController;
export const GET = getSnippetByAuthorController;