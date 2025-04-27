import { cookies } from "next/headers";

export type Cookies = Awaited<ReturnType<typeof cookies>>;
