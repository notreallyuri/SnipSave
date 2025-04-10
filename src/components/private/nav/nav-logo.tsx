import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";

export function NavLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={"/home"}>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar className="rounded-lg">
              <AvatarImage src={"/logo.svg"} />
              <AvatarFallback className="rounded-lg">S</AvatarFallback>
            </Avatar>
            <span className="text-2xl font-semibold text-blue-900 dark:text-blue-100">
              notreallysnips
            </span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
