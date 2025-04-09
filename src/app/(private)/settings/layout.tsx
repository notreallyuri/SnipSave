import { SearchBar } from "@/components/private/search";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-background fixed flex h-14 w-full items-center justify-between gap-4 border-b px-4 sm:relative">
        <SidebarTrigger />
        <SearchBar />
      </header>
      {children}
    </>
  );
}
