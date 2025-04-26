import { useQuery, useMutation } from "@tanstack/react-query";
import { userPreferencesSchema, UserPreferencesSchemaTypes } from "@/schemas";

function useUpdatePreferences() {
  async function fetchRes(data: UserPreferencesSchemaTypes) {
    try {
      const res = await fetch("/api/user/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const content = await res.json();

      const parsedData = userPreferencesSchema.parse(content);
      return parsedData;
    } catch (error) {
      console.error("Error fetching preferences:", error);
      throw error;
    }
  }

  return useMutation({
    mutationFn: fetchRes,
    mutationKey: ["updatePreferences"],
  });
}

function useGetPreferences() {
  async function fetchRes() {
    try {
      const res = await fetch("/api/user/preferences", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const content = await res.json();
      const parsedData = userPreferencesSchema.parse(content);
      return parsedData;
    } catch (error) {
      console.error("Error fetching preferences:", error);
      throw error;
    }
  }

  return useQuery({
    queryFn: fetchRes,
    queryKey: ["getPreferences"],
  });
}

export { useUpdatePreferences, useGetPreferences };
