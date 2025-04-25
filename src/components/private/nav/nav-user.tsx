"use client";
import {
  ChevronsUpDown,
  User,
  Settings,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import { SettingsDialog } from "./dialog-preferences";
import { useGetBaseUserData, useSignOut } from "@/hooks/fetch";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NavUser() {
  const { isMobile, open } = useSidebar();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const router = useRouter();

  const { data: user, isPending } = useGetBaseUserData();

  const profilePicture = user?.image as string | undefined;

  console.log("Profile Picture URL:", profilePicture);

  const { mutate } = useSignOut();

  if (isPending || !user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="grid flex-1 space-y-1 pl-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      {user.isEmailVerified === false && open ? (
        <SidebarMenuItem className="flex flex-col gap-4 rounded-lg border border-emerald-400/75 bg-emerald-400/25 p-2">
          <div className="flex items-center gap-x-2">
            <CircleAlert className="text-primary size-4" />
            <h2 className="text-primary leading-tight font-semibold">
              Verify your email
            </h2>
          </div>
          <Button size={"sm"} className="text-sm">
            Send now
          </Button>
        </SidebarMenuItem>
      ) : (
        <SidebarMenuItem className="flex flex-col items-center gap-4 rounded-lg border border-emerald-400/60 bg-emerald-400/20 py-2">
          <CircleAlert className="text-primary size-4" />
        </SidebarMenuItem>
      )}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={profilePicture} alt={user.username} />
                <AvatarFallback className="rounded-lg">
                  {user.username?.charAt(0).toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.username}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.image ?? undefined}
                    alt={user.username}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.username?.charAt(0).toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.username}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-1 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                <Settings className="mr-1 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-1 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                mutate(undefined, {
                  onSuccess: () => {
                    router.push("/");
                  },
                })
              }
            >
              <LogOut className="mr-1 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <SettingsDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </SidebarMenu>
  );
}
