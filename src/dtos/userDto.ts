import { Snippet } from './snippetDto';	

export interface User {
   name: string;
   email: string;
   password: string;
   emailVerified: Date | null;
   snippets: Snippet[]; 
}

