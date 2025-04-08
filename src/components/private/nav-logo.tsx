import Link from "next/link";
import { Logo } from "../public/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export function NavLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={"/dashboard"}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={"/SnipSaveIcon.svg"} />
              <AvatarFallback className="rounded-lg">S</AvatarFallback>
            </Avatar>
            <span className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
              SnipSave
            </span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
