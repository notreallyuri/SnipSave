import { z } from "zod";
import {
  editorTheme,
  codeLanguage,
  themePreference,
  snippetVisibility,
  language,
} from "./enums";

const userPreferencesSchema = z.object({
  language: language.optional(),
  themePreference: themePreference.optional(),
  editorTheme: editorTheme.optional(),
  notifications: z.boolean().optional(),
  defaultCodeLanguage: codeLanguage.optional(),
  autosave: z.boolean().optional(),
  lineNumbers: z.boolean().optional(),
  showWelcomeTips: z.boolean().optional(),
  defaultSnippetVisibility: snippetVisibility.optional(),
  editorFontSize: z.number().int().min(9).max(24).optional(),
  keyboardShortcuts: z.boolean().optional(),
});

type UserPreferencesSchemaTypes = z.infer<typeof userPreferencesSchema>;

export { userPreferencesSchema };
export type { UserPreferencesSchemaTypes };
