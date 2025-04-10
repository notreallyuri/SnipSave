import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PreferencesType } from "@/schemas";
import { AppError } from "@/lib/errors";

const fetchPreferences = async () => {
  const res = await fetch("/api/preferences");

  if (!res.ok) {
    throw new AppError({
      code: "INTERNAL_SERVER_ERROR",
      message: res.statusText,
    });
  }

  return res.json();
};

const patchPreferences = async (data: PreferencesType) => {
  const res = await fetch("/api/preferences", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new AppError({
      code: "INTERNAL_SERVER_ERROR",
      message: res.statusText,
    });
  }
};

export const useGetPreferences = () =>
  useQuery({
    queryKey: ["preferences"],
    queryFn: fetchPreferences,
    retry: 1,
  });

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchPreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preferences"] });
    },
  });
};
