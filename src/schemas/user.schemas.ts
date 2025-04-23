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

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const BaseUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email(),
  salt: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const UpdateUserSchema = BaseUserSchema.partial();

export const UserSchema = {
  base: BaseUserSchema,
  create: CreateUserSchema,
  update: UpdateUserSchema,
  signUp: SignUpSchema,
  signIn: signInSchema,
  preferences: userPreferencesSchema,
};

export type UserSchemaTypes = {
  base: z.infer<typeof BaseUserSchema>;
  create: z.infer<typeof CreateUserSchema>;
  update: z.infer<typeof UpdateUserSchema>;
  signIn: z.infer<typeof signInSchema>;
  signUp: z.infer<typeof SignUpSchema>;
  preferences: z.infer<typeof userPreferencesSchema>;
};
