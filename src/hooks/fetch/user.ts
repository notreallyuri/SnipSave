import { useQuery } from "@tanstack/react-query";

const useGetBaseUserData = () =>
  useQuery({
    queryFn: async () => {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const content = await res.json();

      return content;
    },
    queryKey: ["user", "base", "get"],
  });

export { useGetBaseUserData };
