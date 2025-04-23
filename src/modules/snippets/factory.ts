import {
  GetSnippetByAuthorService,
  GetSnippetService,
  DeleteSnippetService,
  CreateSnippetService,
  UpdateSnippetService,
} from "./services";
import { SnippetRepository } from "./repository";

const snippetFactory = <T>(
  Service: new (repository: SnippetRepository) => T
) => {
  return new Service(new SnippetRepository());
};

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
