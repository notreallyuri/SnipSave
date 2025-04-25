import { Snippet } from "@/generated";
import { UpdateSnippetType } from "@/schemas";
import { Service } from "@/interfaces";
import { ISnippetRepository } from "../repository";

export class UpdateSnippetService
  implements
    Service<
      ISnippetRepository,
      { id: string; authorId: string; data: UpdateSnippetType },
      Snippet
    >
{
  constructor(public repository: ISnippetRepository) {}

  async execute(args: {
    id: string;
    authorId: string;
    data: UpdateSnippetType;
  }): Promise<Snippet> {
    const { id, authorId, data } = args;
    return await this.repository.update(id, authorId, data);
  }
}
