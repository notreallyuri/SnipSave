export * from "./service";

export type BaseUserData = {
  id: string;
  username: string;
  email: string;
  image?: string | null;
  isEmailVerified: boolean;
};
