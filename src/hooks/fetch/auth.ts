import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc";

export function useSignIn() {
  const trpc = useTRPC();
  return useMutation(trpc.auth.signIn.mutationOptions());
}

export function useSignOut() {
  const trpc = useTRPC();
  return useMutation(trpc.auth.signOut.mutationOptions());
}

export function useSignUp() {
  const trpc = useTRPC();
  return useMutation(trpc.auth.signUp.mutationOptions());
}
