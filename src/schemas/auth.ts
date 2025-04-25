import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  remember: z.boolean(),
});

const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const FrontSignUpSchema = signUpSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

type FrontSignUpSchemaType = z.infer<typeof FrontSignUpSchema>;
type SignUpSchemaType = z.infer<typeof signUpSchema>;
type SignInSchemaType = z.infer<typeof signInSchema>;

export { FrontSignUpSchema, signInSchema, signUpSchema };
export type { FrontSignUpSchemaType, SignUpSchemaType, SignInSchemaType };
