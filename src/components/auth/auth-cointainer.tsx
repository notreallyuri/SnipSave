"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams, useRouter } from "next/navigation";
import { SignIn } from "./signin";
import { SignUp } from "./signup";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function AuthContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") ?? "signin";

  const handleTabChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", value);
    router.push(`?${newParams.toString()}`);
  };

  return (
    <Tabs defaultValue={tab} onValueChange={handleTabChange} className="w-100">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup" className="cursor-pointer">
          Sign Up
        </TabsTrigger>
        <TabsTrigger value="signin" className="cursor-pointer">
          Sign In
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUp />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <SignIn />
          </CardContent>
          <div className="flex items-center justify-center gap-4">
            <div className="h-0.25 w-30 bg-black/25 dark:bg-white/50" />
            or
            <div className="h-0.25 w-30 bg-black/25 dark:bg-white/50" />
          </div>
          <CardFooter className="grid grid-cols-2 gap-6 text-emerald-500 dark:text-emerald-300">
            <Button
              className="w-full cursor-pointer hover:text-emerald-400 dark:hover:text-emerald-200"
              variant={"outline"}
            >
              <FontAwesomeIcon icon={faGithub} className="text-lg" />
              Github
            </Button>

            <Button
              className="w-full cursor-pointer hover:text-emerald-400 dark:hover:text-emerald-200"
              variant={"outline"}
            >
              <FontAwesomeIcon icon={faGoogle} className="text-lg" />
              Google
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
