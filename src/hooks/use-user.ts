import { useState, useEffect } from "react";
import { AppError } from "@/lib/errors";

interface User {
  image: string;
  name: string;
  email: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new AppError({
            code: "INTERNAL_SERVER_ERROR",
            message: res.statusText,
          });
        }

        const data = await res.json();
        setUser({
          image: data.user?.image ?? "",
          name: data.user?.username ?? "User",
          email: data.user?.email ?? "random",
        });
      } catch (err) {
        setError(
          err instanceof AppError ? err.message : "Failed to fetch user data.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}
