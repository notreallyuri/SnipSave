import { ISnippetRepository } from "../repository";
import { SnippetSchemaType } from "@/schemas";
import { Service } from "@/interfaces";
import { Snippet } from "@/generated";

export class CreateSnippetService
  implements
    Service<
      ISnippetRepository,
      { authorId: string; data: SnippetSchemaType },
      Snippet
    >
{
  constructor(public repository: ISnippetRepository) {}

  async execute(args: {
    authorId: string;
    data: SnippetSchemaType;
  }): Promise<Snippet> {
    return await this.repository.create(args.authorId, args.data);
  }
}
