import { Snippet } from "@/generated";
import { SnippetSchemaTypes } from "@/schemas";
import { prisma } from "@/lib/prisma";

export interface ISnippetRepository {
  create(
    authorId: string,
    data: SnippetSchemaTypes["create"]
  ): Promise<Snippet>;
  update(
    id: string,
    authorId: string,
    data: SnippetSchemaTypes["update"]
  ): Promise<Snippet>;
  delete(id: string, authorId: string): Promise<boolean>;
  getById(id: string): Promise<Snippet | null>;
  getByAuthor(authorId: string): Promise<SnippetSchemaTypes["table"][]>;
}

export class SnippetRepository implements ISnippetRepository {
  create(
    authorId: string,
    data: SnippetSchemaTypes["create"]
  ): Promise<Snippet> {
    return prisma.snippet.create({
      data: {
        ...data,
        userId: authorId,
      },
    });
  }

  async update(
    id: string,
    authorId: string,
    data: SnippetSchemaTypes["update"]
  ): Promise<Snippet> {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet || snippet.userId !== authorId) {
      throw new Error("Snippet not found");
    }

    return await prisma.snippet.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, authorId: string): Promise<boolean> {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet || snippet.userId !== authorId) {
      return false;
    }

    await prisma.snippet.delete({
      where: { id },
    });

    return true;
  }

  getById(id: string): Promise<Snippet | null> {
    return prisma.snippet.findUnique({
      where: { id },
    });
  }

  getByAuthor(authorId: string): Promise<SnippetSchemaTypes["table"][]> {
    return prisma.snippet.findMany({
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
