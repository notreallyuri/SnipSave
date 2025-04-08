import { Snippet } from './snippetDto';

export interface Tags {
    name: string;
    description: string;
    userId: string;
    snippets: Snippet[];
}