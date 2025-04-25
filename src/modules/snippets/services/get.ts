import { ISnippetRepository } from "../repository";
import { SnippetTableType } from "@/schemas";
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
  implements Service<ISnippetRepository, string, SnippetTableType[]>
{
  constructor(public repository: ISnippetRepository) {}

  async execute(authorId: string): Promise<SnippetTableType[]> {
    return await this.repository.getByAuthor(authorId);
  }
}
