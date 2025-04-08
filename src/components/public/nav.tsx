import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <header
      className={cn(
        "absolute top-5 left-1/2 flex h-14 w-2/3 -translate-x-1/2 items-center justify-between rounded-xl border px-4",
        "dark:border-neutral-600 dark:bg-neutral-800",
        "border-neutral-300",
      )}
    >
      <h1 className="text-xl font-semibold select-none">SnipSave</h1>
      <nav></nav>
      <div className="space-x-2">
        <Link href={"/auth?tab=signup"}>
          <Button variant={"secondary"} className="cursor-pointer">
            Sign Up
          </Button>
        </Link>
        <Link href={"/auth?tab=signin"}>
          <Button className="cursor-pointer">Sign In</Button>
        </Link>
      </div>
    </header>
  );
}
