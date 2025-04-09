"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-search";
import { Input } from "../ui/input";

export function SearchBar() {
  const { searchQuery, setSearchQuery, searchRef, handleSubmit } = useSearch();

  return (
    <>
      <Input
        ref={searchRef}
        placeholder="Search"
        value={searchQuery}
        onBlur={handleSubmit}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search"
        className="md:w-72"
      />
    </>
  );
}
