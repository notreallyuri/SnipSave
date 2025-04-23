import { ISnippetRepository } from "../repository";
import { SnippetSchemaTypes } from "@/schemas";
import { Snippet } from "@/generated";
import { Service } from "@/interfaces";

export class GetSnippetService
  implements Service<ISnippetRepository, string, Snippet | null>
{
  constructor(public repository: ISnippetRepository) {}

  async execute(id: string): Promise<Snippet | null> {
    return await this.repository.getById(id);
  }
}

export class GetSnippetByAuthorService
  implements Service<ISnippetRepository, string, SnippetSchemaTypes["table"][]>
{
  constructor(public repository: ISnippetRepository) {}

  async execute(authorId: string): Promise<SnippetSchemaTypes["table"][]> {
    return await this.repository.getByAuthor(authorId);
  }
}
