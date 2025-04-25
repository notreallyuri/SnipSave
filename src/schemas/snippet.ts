import { z } from "zod";
import { codeLanguage, snippetVisibility } from "./enums";

const SnippetSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().max(500).optional(),
  content: z.string().nonempty("Snippet content is required."),
  language: codeLanguage,
  visibility: snippetVisibility.default("public"),
});

const updateSnippetSchema = SnippetSchema.partial();

type SnippetSchemaType = z.infer<typeof SnippetSchema>;
type UpdateSnippetType = z.infer<typeof updateSnippetSchema>;

export { SnippetSchema, updateSnippetSchema };
export type { SnippetSchemaType, UpdateSnippetType };
