import Image from "next/image";
import Nav from "@/components/public/nav";
import CustomSidebar from "@/components/private/sidebar";
import { ThemeToggle } from "@/components/public/theme-toggle";

import { metadata } from "./layout";

metadata.title = "SnipSave"

export default function Home() {
  return (
    <>
      <ThemeToggle absolute />
      <Nav />
    </>
  );
}
