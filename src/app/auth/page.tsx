import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AuthContainer from "@/components/auth/auth-cointainer";
import { metadata } from "@/app/layout";

metadata.title = "Authentication | SnipSave";

export default function Auth() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Link href={"/"}>
        <Button variant={"outline"} className="absolute top-5 left-5">
          <ArrowLeft />
          Return
        </Button>
      </Link>
      <AuthContainer />
    </main>
  );
}
