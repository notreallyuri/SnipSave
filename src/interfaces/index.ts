export * from "./service";
export * from "./sessions";

export type BaseUserData = {
  id: string;
  username: string;
  email: string;
  image?: string | null;
};
