import {
  GetSnippetByAuthorService,
  GetSnippetService,
  DeleteSnippetService,
  CreateSnippetService,
  UpdateSnippetService,
} from "./services";
import { SnippetRepository, ISnippetRepository } from "./repository";

const snippetFactory = <T>(
  Service: new (repository: ISnippetRepository) => T
) => new Service(new SnippetRepository());

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
