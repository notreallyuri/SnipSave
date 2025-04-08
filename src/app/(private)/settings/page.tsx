import { ThemeToggle } from "@/components/public/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Settings() {
  return (
    <>
      <header className="w-full border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-3xl font-semibold select-none">Settings</h1>
          </div>
          <ThemeToggle />
        </div>
        <nav></nav>
      </header>
    </>
  );
}
