import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div>
      <img
        src="/SnipSaveIcon.svg"
        alt="SnipSave logo"
        className={cn("h-8 w-8", className)}
      />
    </div>
  );
}

export function LogoWithText({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <img src="/SnipSaveIcon.svg" alt="SnipSave logo" className="h-8 w-8" />
      <span className="text-2xl font-semibold text-blue-100">SnipSave</span>
    </div>
  );
}
