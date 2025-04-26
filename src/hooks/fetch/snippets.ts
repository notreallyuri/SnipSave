import { useQuery, useMutation } from "@tanstack/react-query";
import { SnippetSchemaType, UpdateSnippetType } from "@/schemas";

const useGetSnippets = () =>
  useQuery({
    queryKey: ["snippets"],
    queryFn: async () => {
      const res = await fetch("/api/snippet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const content = await res.json();

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return content;
    },
  });

const useGetSnippetById = (id: string) =>
  useQuery({
    queryKey: ["snippet", id],
    queryFn: async ({ queryKey }) => {
      const [, snippetId] = queryKey;

      const res = await fetch(`/api/snippet/${snippetId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const content = await res.json();

      if (!res.ok) {
        throw new Error(content?.message || "Network response was not ok");
      }

      return content;
    },

    enabled: !!id,
  });

const useDeleteSnippet = () =>
  useMutation({
    mutationKey: ["snippet", "delete"],
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/snippet/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Network response was not ok");
      }

      return true;
    },
  });

const useUpdateSnippet = () =>
  useMutation({
    mutationKey: ["snippet", "update"],
    mutationFn: async (args: { id: string; data: UpdateSnippetType }) => {
      const { id, data } = args;

      const res = await fetch(`/api/snippet/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const content = await res.json();

      if (!res.ok) {
        throw new Error(content?.message || "Network response was not ok");
      }

      return content;
    },
  });

const useCreateSnippet = () =>
  useMutation({
    mutationKey: ["snippet", "create"],
    mutationFn: async (data: SnippetSchemaType) => {
      const res = await fetch("/api/snippet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const content = await res.json();

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      return content;
    },
  });

export {
  useCreateSnippet,
  useGetSnippets,
  useGetSnippetById,
  useDeleteSnippet,
};
