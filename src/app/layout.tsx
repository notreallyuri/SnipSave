import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import React from "react";
import "./globals.css";

import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { ourFileRouter } from "./api/uploadthing/core";

export const metadata: Metadata = {
  title: "SnipSave",
  description:
    "A lightweight app to save, tag, and search your favorite code snippets. Think of it like your personal snippet manager, but cleaner and faster than using Notion or VS Code gists.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <QueryProvider>
        <body className={`${inter.className} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
