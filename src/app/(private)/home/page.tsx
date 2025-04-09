import { metadata } from "@/app/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchBar } from "@/components/private/search";

metadata.title = "Home | SnipSave";

export default function Home() {
  return (
    <>
      <header className="bg-background fixed flex h-14 w-full items-center justify-between gap-4 border-b px-4 sm:relative">
        <div className="inline-flex items-center text-2xl font-semibold">
          <SidebarTrigger />
          <h1>Home</h1>
        </div>
        <SearchBar />
      </header>
      <main className="grid w-full grid-cols-1 gap-4 p-4 pt-16 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg dark:hover:shadow-emerald-400/20">
          <CardHeader>
            <CardTitle className="text-2xl">Create Snippet</CardTitle>
            <CardDescription>Create your own snippets</CardDescription>
          </CardHeader>
          <CardContent className="hidden h-full items-end justify-end sm:flex">
            <Button variant={"outline"}>New</Button>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-lg dark:hover:shadow-emerald-400/20">
          <CardContent className="space-y-1 text-sm">
            <CardTitle className="text-2xl">Recently Edited</CardTitle>
            <p>🔸 auth.ts</p>
            <p>🔸 utils/fetch.ts</p>
            <p className="text-muted-foreground">+ 3 more</p>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-lg dark:hover:shadow-emerald-400/20">
          <CardContent className="space-y-1 text-sm">
            <CardTitle className="text-2xl">Starred</CardTitle>
            <p>⭐ login-flow.tsx</p>
            <p>⭐ api.ts</p>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-lg dark:hover:shadow-emerald-400/20">
          <CardContent className="text-sm">
            <CardTitle className="text-2xl">Your Stats</CardTitle>
            <p>📁 12 snippets</p>
            <p>🗂️ 4 collections</p>
            <p>👀 30 public views</p>
          </CardContent>
        </Card>
        <Card className="transition hover:shadow-lg sm:col-span-2 lg:col-span-4 dark:hover:shadow-emerald-400/20">
          <CardHeader>
            <CardTitle className="text-2xl">Complete your profile</CardTitle>
            <CardDescription>
              Complete filling profile details & preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress
              value={20}
              className="[&_[data-slot=progress-indicator]]:bg-emerald-500"
            />
            <p className="text-muted-foreground text-sm">20%</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
