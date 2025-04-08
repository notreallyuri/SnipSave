"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import React from "react";
import { NavUser } from "./nav-user";
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

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={cn(sidebar.state === "collapsed" && "flex items-center")}
      >
        <h1 className="text-xl font-semibold">
          {sidebar.state === "collapsed" ? "S" : "SnipSave"}
        </h1>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
