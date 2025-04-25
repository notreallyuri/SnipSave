import {
  getSnippetByIdcontroller,
  deleteSnippetController,
  updateSnippetController,
} from "@/modules/snippets/controllers";

export const GET = getSnippetByIdcontroller;
export const DELETE = deleteSnippetController;
export const PATCH = updateSnippetController;
