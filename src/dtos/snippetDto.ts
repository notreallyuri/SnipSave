import { Tags } from "./tagsDto";

export interface Snippet {
  title: string;
  content: string;
  userId: string;
  tags: Tags[];
}
