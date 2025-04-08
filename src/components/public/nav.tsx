import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <header
      className={cn(
        "absolute top-5 left-1/2 flex h-14 w-2/3 -translate-x-1/2 items-center justify-between rounded-lg border px-4",
        "backdrop-blur-xl dark:border-zinc-700 dark:bg-white/5",
        "border-neutral-300 bg-black/5 backdrop-blur-xl",
      )}
    >
      <h1 className="text-xl font-semibold select-none">SnipSave</h1>
      <nav></nav>
      <div className="space-x-2">
        <Link href={"/auth?tab=signup"}>
          <Button variant={"outline"} className="w-20 cursor-pointer">
            Sign Up
          </Button>
        </Link>
        <Link href={"/auth?tab=signin"}>
          <Button className="w-20 cursor-pointer">Sign In</Button>
        </Link>
      </div>
    </header>
  );
}
