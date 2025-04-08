import { Snippet } from './snippetDto';	

export interface User {
   name: string;
   avatar: string;
   email: string;
   password: string;
   emailVerified: Date | null;
   snippets: Snippet[]; 
}

