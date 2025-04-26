import { metadata } from "@/app/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchBar } from "@/components/private/search";
import { DataTable } from "@/components/private/data-table";
import { SnippetDialog } from "@/components/private/snippet-dialog";
import { UploadPFP } from "@/components/private/uploadthings";

metadata.title = "Home | SnipSave";

const mockData = Array.from({ length: 40 }, (_, i) => {
  const id = (i + 1).toString();
  const name = `Snippet ${i + 1}`;
  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "Rust",
    "C++",
    "C#",
    "Ruby",
    "Swift",
    "Kotlin",
  ];

  const language = languages[i % languages.length];
  const createdAt = new Date(2024, 0, 1 + i).toISOString().split("T")[0];
  const updatedAt = new Date(2024, 0, 5 + i).toISOString().split("T")[0];

  return { id, name, language, createdAt, updatedAt };
});

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
      <main className="grid w-full grid-cols-1 gap-4 p-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="dark:hover:shadow-primary hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Create Snippet</CardTitle>
            <CardDescription>Create your own snippets</CardDescription>
          </CardHeader>
          <CardContent className="hidden h-full items-end justify-end sm:flex">
            <SnippetDialog>
              <Button variant={"outline"}>New</Button>
            </SnippetDialog>
          </CardContent>
        </Card>

        <Card className="dark:hover:shadow-primary transition hover:shadow-lg">
          <CardContent className="space-y-1 text-sm">
            <CardTitle className="text-2xl">Recently Edited</CardTitle>
            <p>🔸 auth.ts</p>
            <p>🔸 utils/fetch.ts</p>
            <p className="text-muted-foreground">+ 3 more</p>
          </CardContent>
        </Card>

        <Card className="dark:hover:shadow-primarytransition hover:shadow-lg">
          <CardContent className="space-y-1 text-sm">
            <CardTitle className="text-2xl">Starred</CardTitle>
            <p>⭐ login-flow.tsx</p>
            <p>⭐ api.ts</p>
          </CardContent>
        </Card>

        <Card className="dark:hover:shadow-primary transition hover:shadow-lg">
          <CardContent className="text-sm">
            <CardTitle className="text-2xl">Your Stats</CardTitle>
            <p>📁 12 snippets</p>
            <p>🗂️ 4 collections</p>
            <p>👀 30 public views</p>
          </CardContent>
        </Card>
        <Card className="dark:hover:shadow-primary transition hover:shadow-lg sm:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-2xl">Complete your profile</CardTitle>
            <CardDescription>
              Complete filling profile details & preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Progress
              value={20}
              className="[&_[data-slot=progress-indicator]]:bg-primary"
            />
            <p className="text-muted-foreground text-sm">20%</p>
          </CardContent>
        </Card>
        <Card className="dark:hover:shadow-primary col-span-1 gap-0 overflow-hidden rounded-lg pt-0 pb-2 transition hover:shadow-lg lg:col-span-4">
          <DataTable data={[]} />
        </Card>
      </main>
    </>
  );
}
