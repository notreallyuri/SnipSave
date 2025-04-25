import { Snippet } from "@/generated";
import { SnippetSchemaTypes } from "@/schemas";
import { Service } from "@/interfaces";
import { ISnippetRepository } from "../repository";

export class UpdateSnippetService
  implements
    Service<
      ISnippetRepository,
      { id: string; authorId: string; data: SnippetSchemaTypes["update"] },
      Snippet
    >
{
  constructor(public repository: ISnippetRepository) {}

  async execute(args: {
    id: string;
    authorId: string;
    data: SnippetSchemaTypes["update"];
  }): Promise<Snippet> {
    const { id, authorId, data } = args;
    return await this.repository.update(id, authorId, data);
  }
}
