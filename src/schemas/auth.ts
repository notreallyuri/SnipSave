import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  remember: z.boolean(),
});

const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  remember: z.boolean(),
});

const FrontSignUpSchema = SignUpSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

type FrontSignUpSchemaType = z.infer<typeof FrontSignUpSchema>;
type SignUpSchemaType = z.infer<typeof SignUpSchema>;
type SignInSchemaType = z.infer<typeof SignInSchema>;

export { FrontSignUpSchema, SignInSchema, SignUpSchema };
export type { FrontSignUpSchemaType, SignUpSchemaType, SignInSchemaType };
