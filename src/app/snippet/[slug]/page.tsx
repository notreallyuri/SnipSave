import { CodeBlock } from "@/components/private/codeblock/codeblock";
import Typography from "@/components/public/typograph";

type props = { params: Promise<{ slug: string }> };

export default async function Page({ params }: props) {
  const { slug } = await params;

  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="h-full w-3xl border-x p-6">
          <Typography.H2>Snippet {slug}</Typography.H2>

          <div className="flex flex-col gap-2 my-4">
            <Typography.H4>Details</Typography.H4>
            <Typography.Muted>Snippet {slug} details</Typography.Muted>
          </div>

          <div className="w-full">
            <CodeBlock lang="typescript" theme="catppuccin-macchiato">
              test
            </CodeBlock>
          </div>
        </div>
      </main>
    </>
  );
}
