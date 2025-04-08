import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/public/theme-provider";
import { ThemeToggle } from "@/components/public/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SnipSave",
  description:
    "A lightweight app to save, tag, and search your favorite code snippets. Think of it like your personal snippet manager, but cleaner and faster than using Notion or VS Code gists.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Radix UI",
    "Shadcn UI",
    "Starter Template",
  ],
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  antialiased bg-white dark:bg-neutral-950`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeToggle />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
