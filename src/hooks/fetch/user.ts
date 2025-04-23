import { useQuery, useMutation } from "@tanstack/react-query";

function useGetBaseUserData() {
  async function query() {
    try {
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
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  return useQuery({
    queryFn: query,
    queryKey: ["getBaseUserData"],
  });
}

export { useGetBaseUserData };
