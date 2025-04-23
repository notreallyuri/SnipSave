import { z } from "zod";
import {
  CodeLanguage,
  EditorTheme,
  Language,
  SnippetVisibility,
  ThemePreference,
} from "@/generated/client";

export const codeLanguage = z.nativeEnum(CodeLanguage);
export const editorTheme = z.nativeEnum(EditorTheme);
export const language = z.nativeEnum(Language);
export const snippetVisibility = z.nativeEnum(SnippetVisibility);
export const themePreference = z.nativeEnum(ThemePreference);
