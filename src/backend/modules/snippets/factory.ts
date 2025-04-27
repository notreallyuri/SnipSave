import {
  GetSnippetByAuthorService,
  GetSnippetService,
  DeleteSnippetService,
  CreateSnippetService,
  UpdateSnippetService,
} from "./services";
import { SnippetRepository } from "./repository";
import { prisma } from "@/lib/prisma";
import { ISnippetRepository } from "@/backend/interfaces/repositories";

const snippetFactory = <T>(
  Service: new (repository: ISnippetRepository) => T,
) => new Service(new SnippetRepository(prisma));

const getSnippetByAuthor = snippetFactory(GetSnippetByAuthorService);
const getSnippet = snippetFactory(GetSnippetService);
const deleteSnippet = snippetFactory(DeleteSnippetService);
const createSnippet = snippetFactory(CreateSnippetService);
const updateSnippet = snippetFactory(UpdateSnippetService);

export {
  getSnippet,
  getSnippetByAuthor,
  deleteSnippet,
  createSnippet,
  updateSnippet,
};
