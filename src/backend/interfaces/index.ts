export * from "./service";
export * from "./repositories";

export type BaseUserData = {
  id: string;
  username: string;
  email: string;
  image?: string | null;
  isEmailVerified: boolean;
};
