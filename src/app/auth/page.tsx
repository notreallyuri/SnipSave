import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AuthContainer from "@/components/auth/auth-cointainer";
import { metadata } from "@/app/layout";

metadata.title = "Authentication | SnipSave";

export default function Auth() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <Button variant={"outline"} className="absolute top-5 left-5">
        <Link href={"/"} className="flex items-center gap-2">
          <ArrowLeft />
          Return
        </Link>
      </Button>
      <div className="mb-10 flex flex-col items-center">
        <img src="/logo.svg" className="size-26" alt="" />
        <h1 className="text-4xl font-semibold">notreallysnips</h1>
      </div>
      <AuthContainer />
    </main>
  );
}
