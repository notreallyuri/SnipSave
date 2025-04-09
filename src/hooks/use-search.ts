import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useCallback } from "react";

export function useSearch() {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("q") || "",
  );
  const [debouncedQuery, setDebouncedQuery] = React.useState(searchQuery);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      const params = new URLSearchParams(searchParams);
      if (debouncedQuery.trim()) params.set("q", debouncedQuery);
      else params.delete("q");

      router.push(`${pathname}?${params.toString()}`);
    },
    [debouncedQuery, pathname, router, searchParams],
  );

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }

      if (e.key === "Escape" && document.activeElement === searchRef.current) {
        e.preventDefault();
        searchRef.current?.blur();
      }

      if (e.key === "Enter" && document.activeElement === searchRef.current) {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleSubmit]);

  React.useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    if (urlQuery !== searchQuery) setSearchQuery(urlQuery);
  }, [searchParams]);

  return { searchQuery, setSearchQuery, searchRef, handleSubmit };
}
