import { Snippet } from "@/generated";
import { SnippetSchemaTypes } from "@/schemas";
import { Service } from "@/interfaces";
import { ISnippetRepository } from "../repository";

export class DeleteSnippetService
  implements
    Service<ISnippetRepository, { id: string; authorId: string }, boolean>
{
  constructor(public repository: ISnippetRepository) {}

  async execute(args: { id: string; authorId: string }): Promise<boolean> {
    const { id, authorId } = args;

    return await this.repository.delete(id, authorId);
  }
}
