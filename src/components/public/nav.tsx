import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export default function Nav() {
  return (
    <header
      className={cn(
        "flex h-14 w-full items-center justify-between border px-4",
        "backdrop-blur-xl dark:border-zinc-700 dark:bg-white/5",
        "border-neutral-300 bg-gray-50 backdrop-blur-xl",
      )}
    >
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="" className="size-8" />
        <h1 className="text-xl font-semibold select-none">notreallysnips</h1>
      </div>
      <nav></nav>
      <div className="flex items-center space-x-2">
        <Link href={"/auth?tab=signup"}>
          <Button variant={"outline"} className="w-20 cursor-pointer">
            Sign Up
          </Button>
        </Link>
        <Link href={"/auth?tab=signin"}>
          <Button className="w-20 cursor-pointer text-white bg-emerald-500">Sign In</Button>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
