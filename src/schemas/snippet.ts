import { z } from "zod";
import { codeLanguage, language, snippetVisibility } from "./enums";

const SnippetSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().max(500).optional(),
  content: z.string().nonempty("Snippet content is required."),
  language: codeLanguage,
  visibility: snippetVisibility.default("public"),
});

const SnippetTable = z.object({
  id: z.string(),
  title: z.string(),
  language: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const UpdateSnippetSchema = SnippetSchema.partial();

type SnippetSchemaType = z.infer<typeof SnippetSchema>;
type SnippetTableType = z.infer<typeof SnippetTable>;
type UpdateSnippetType = z.infer<typeof UpdateSnippetSchema>;

export { SnippetSchema, UpdateSnippetSchema, SnippetTable };
export type { SnippetSchemaType, UpdateSnippetType, SnippetTableType };
