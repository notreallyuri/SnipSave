"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { SidebarMenu, SidebarMenuItem, useSidebar } from "../../ui/sidebar";

export function NavLogo() {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      {open ? (
        <SidebarMenuItem className="flex space-x-2">
          <Avatar className="rounded-lg">
            <AvatarImage src={"/logo.svg"} />
            <AvatarFallback className="rounded-lg">S</AvatarFallback>
          </Avatar>
          <span className="text-2xl font-semibold select-none text-blue-900 dark:text-blue-100">
            notreallysnips
          </span>
        </SidebarMenuItem>
      ) : (
        <SidebarMenuItem className="flex space-x-2">
          <Avatar className="rounded-lg">
            <AvatarImage src={"/logo.svg"} />
            <AvatarFallback className="rounded-lg">S</AvatarFallback>
          </Avatar>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
