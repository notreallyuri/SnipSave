import { z } from "zod";
import { codeLanguage, snippetVisibility } from "./enums";

export const baseSnippetSchema = z.object({
  title: z.string().trim().min(1).max(100),
  description: z.string().max(500).optional(),
  content: z.string().nonempty("Snippet content is required."),
  language: codeLanguage,
  visibility: snippetVisibility.default("public"),
});

export const TableSnippetSchema = z.object({
  id: z.string(),
  title: z.string(),
  language: codeLanguage,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const updateSnippetSchema = baseSnippetSchema.partial();

export const SnippetSchema = {
  create: baseSnippetSchema,
  update: updateSnippetSchema,
  table: TableSnippetSchema,
};

export type SnippetSchemaTypes = {
  create: z.infer<typeof baseSnippetSchema>;
  update: z.infer<typeof updateSnippetSchema>;
  table: z.infer<typeof TableSnippetSchema>;
};
