import { z } from "zod";

const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  salt: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const UpdateUserSchema = UserSchema.partial();

type UserSchemaType = z.infer<typeof UserSchema>;
type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;

export { UserSchema, UpdateUserSchema };
export type { UserSchemaType, UpdateUserSchemaType };
