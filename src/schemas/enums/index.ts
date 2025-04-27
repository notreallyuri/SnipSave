import { z } from "zod";
import {
  CodeLanguage,
  EditorTheme,
  Language,
  SnippetVisibility,
  ThemePreference,
} from "@/backend/prisma/generated/client";

const codeLanguage = z.nativeEnum(CodeLanguage);
const editorTheme = z.nativeEnum(EditorTheme);
const language = z.nativeEnum(Language);
const snippetVisibility = z.nativeEnum(SnippetVisibility);
const themePreference = z.nativeEnum(ThemePreference);

export {
  codeLanguage,
  editorTheme,
  language,
  snippetVisibility,
  themePreference,
};
