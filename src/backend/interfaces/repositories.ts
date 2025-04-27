import {
  SignInSchemaType,
  SignUpSchemaType,
  SnippetSchemaType,
  SnippetTableType,
  UpdateSnippetType,
} from "@/schemas";
import { SessionData } from "@/backend/modules/session/config";
import { SessionInput } from "@/backend/modules/session/repository";
import { Snippet } from "@/backend/prisma/generated";
import { UserData } from "@/backend/types/user";

export interface ISessionRepository {
  createSession({ user, remember }: SessionInput): Promise<void>;
  getUserSession(): Promise<SessionData["user"]>;
  destroySession(): Promise<void>;
}

export interface ISnippetRepository {
  create(authorId: string, data: SnippetSchemaType): Promise<Snippet>;
  update(
    id: string,
    authorId: string,
    data: UpdateSnippetType,
  ): Promise<Snippet>;
  delete(id: string, authorId: string): Promise<boolean>;
  getById(id: string): Promise<Snippet | null>;
  getByAuthor(authorId: string): Promise<SnippetTableType[]>;
}

export interface IAuthRepository {
  signUp(data: Omit<SignUpSchemaType, "remember">): Promise<UserData>;
  signIn(
    data: Omit<SignInSchemaType, "remember">,
  ): Promise<UserData & { password: string | null; salt: string | null }>;
}
