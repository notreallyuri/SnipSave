"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { BookOpen, PieChart, Settings2 } from "lucide-react";
import React from "react";
import { NavUser } from "./nav-user";
import { NavLogo } from "./nav-logo";
import { cn } from "@/lib/utils";

import { Logo, LogoWithText } from "@/components/public/logo";
import Link from "next/link";

const data = {
  user: {
    avatar:
      "https://w7zsywbg33.ufs.sh/f/Z6zpkKlEBO2RGSm7Si4S9AU6jiBfT3EMqnCKuxGcgleHNLkv",
    name: "Yuri",
    email: "test@example.com",
  },
  navMain: [
    { title: "Dashboard", icon: PieChart },
    { title: "Documentation", icon: BookOpen },
    { title: "Settings", icon: Settings2 },
  ],
};

export default function CustomSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
