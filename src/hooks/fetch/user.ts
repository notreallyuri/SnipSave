import { useQuery, useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc";

export function useGetUserByEmail(email: string) {
  const trpc = useTRPC();
  return useQuery(trpc.user.getUserByEmail.queryOptions(email));
}

export function useGetUserById(id: string) {
  const trpc = useTRPC();
  return useQuery(trpc.user.getUserById.queryOptions(id));
}

export function useGetBaseUserData() {
  const trpc = useTRPC();
  return useQuery(trpc.user.getBaseUserData.queryOptions());
}

export function useUpdateUser() {
  const trpc = useTRPC();
  return useMutation(trpc.user.updateUser.mutationOptions());
}

export function useGetPreferences() {
  const trpc = useTRPC();
  return useQuery(trpc.user.getPreferences.queryOptions());
}

export function useUpdatePreferences() {
  const trpc = useTRPC();
  return useMutation(trpc.user.updatePreferences.mutationOptions());
}
