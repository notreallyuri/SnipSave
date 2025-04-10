import { z } from "zod";

export const userPreferencesSchema = z.object({
  language: z.enum(["en", "es", "fr", "de", "pt", "ja", "zh"]).optional(),
  themePreference: z.enum(["light", "dark", "system"]).optional(),
  editorTheme: z
    .enum([
      "dracula",
      "monokai",
      "solarized_light",
      "solarized_dark",
      "github_light",
      "github_dark",
      "nord",
      "night_owl",
      "catppuccin_latte",
      "catppuccin_frappe",
      "catppuccin_macchiato",
      "catppuccin_mocha",
    ])
    .optional(),
  notifications: z.boolean().optional(),
  defaultCodeLanguage: z
    .enum([
      "javascript",
      "typescript",
      "python",
      "go",
      "rust",
      "html",
      "css",
      "cpp",
      "java",
      "sql",
      "json",
      "markdown",
    ])
    .optional(),
  autosave: z.boolean().optional(),
  lineNumbers: z.boolean().optional(),
  showWelcomeTips: z.boolean().optional(),
  defaultSnippetVisibility: z.enum(["public", "private"]).optional(),
  editorFontSize: z.number().int().min(9).max(24).optional(),
  keyboardShortcuts: z.boolean().optional(),
});

export type PreferencesType = z.infer<typeof userPreferencesSchema>;
export type PreferencesTypeKeys = keyof PreferencesType;
