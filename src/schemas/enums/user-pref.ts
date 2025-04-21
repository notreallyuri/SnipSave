import { z } from "zod";

export const editorTheme = z.enum([
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
]);

export const defaultCodeLanguage = z.enum([
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
]);
