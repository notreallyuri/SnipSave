import { ISnippetRepository } from "@/backend/interfaces/repositories";
import { PrismaClient, Snippet } from "@/backend/prisma/generated";
import {
  SnippetSchemaType,
  UpdateSnippetType,
  SnippetTableType,
} from "@/schemas";

export class SnippetRepository implements ISnippetRepository {
  private readonly client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  create(authorId: string, data: SnippetSchemaType): Promise<Snippet> {
    return this.client.snippet.create({
      data: {
        ...data,
        userId: authorId,
      },
    });
  }

  async update(
    id: string,
    authorId: string,
    data: UpdateSnippetType,
  ): Promise<Snippet> {
    const snippet = await this.client.snippet.findUnique({
      where: { id },
    });

    if (!snippet || snippet.userId !== authorId) {
      throw new Error("Snippet not found");
    }

    return await this.client.snippet.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, authorId: string): Promise<boolean> {
    const snippet = await this.client.snippet.findUnique({
      where: { id },
    });

    if (!snippet || snippet.userId !== authorId) {
      return false;
    }

    await this.client.snippet.delete({
      where: { id },
    });

    return true;
  }

  getById(id: string): Promise<Snippet | null> {
    return this.client.snippet.findUnique({
      where: { id },
    });
  }

  getByAuthor(authorId: string): Promise<SnippetTableType[]> {
    return this.client.snippet.findMany({
      where: { userId: authorId },
      select: {
        id: true,
        title: true,
        language: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
