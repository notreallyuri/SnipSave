import { ISnippetRepository } from "../repository";
import { SnippetSchemaTypes } from "@/schemas";
import { Service } from "@/interfaces";
import { Snippet } from "@/generated";

export class CreateSnippetService
  implements
    Service<
      ISnippetRepository,
      { authorId: string; data: SnippetSchemaTypes["create"] },
      Snippet
    >
{
  constructor(public repository: ISnippetRepository) {}

  async execute(args: {
    authorId: string;
    data: SnippetSchemaTypes["create"];
  }): Promise<Snippet> {
    return await this.repository.create(args.authorId, args.data);
  }
}
