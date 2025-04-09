"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SquareTerminal } from "lucide-react";

import { BookOpen, Settings2 } from "lucide-react";
import { NavUser } from "./nav-user";
import { NavLogo } from "./nav-logo";
import { NavMain } from "./nav-main";
import React from "react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "General",
          url: "/dashboard",
        },
        {
          title: "Starred",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Account",
          url: "/settings/account",
        },
      ],
    },
  ],
};

export default function CustomSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = {
    image: "",
    name: "Yuri",
    email: "example@mail.com",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            image: user?.image ?? "",
            name: user?.name ?? "User",
            email: user?.email ?? "radom",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
