import type { BundledLanguage, BundledTheme } from "shiki";
import { codeToHtml } from "shiki";
import module from "./codeblock.module.css";

interface Props {
  children: string;
  lang: BundledLanguage;
  theme: BundledTheme;
}

export async function CodeBlock(props: Props) {
  const format = (theme: string): string =>
    theme.replace(/_/g, "-").toLowerCase();

  try {
    const out = await codeToHtml(props.children, {
      lang: props.lang,
      theme: format(props.theme),
    });

    return (
      <div
        dangerouslySetInnerHTML={{ __html: out }}
        className={module.shiki}
      />
    );
  } catch (error) {
    console.error("Error in syntax highlighting:", error);
    return <div>Error rendering code block</div>;
  }
}
