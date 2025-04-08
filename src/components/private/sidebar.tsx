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
import { useSession } from "next-auth/react";
import React from "react";
import { NavUser } from "./nav-user";
import { NavLogo } from "./nav-logo";
import { cn } from "@/lib/utils";

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
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const user = session?.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            image: user?.image ?? "",
            name: user?.name ?? "User",
            email: user?.email ?? "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
