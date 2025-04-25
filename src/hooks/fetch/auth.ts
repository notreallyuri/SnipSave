import { useMutation } from "@tanstack/react-query";
import { UserSchemaTypes } from "@/schemas";

const useSignIn = () =>
  useMutation({
    mutationFn: async (data: UserSchemaTypes["signIn"]) => {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to sign in");
      }

      const content = await res.json();

      return content;
    },
    mutationKey: ["auth", "signin"],
  });

const useSignUp = () =>
  useMutation({
    mutationFn: async (data: UserSchemaTypes["create"]) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const content = await res.json();

      if (!res.ok) {
        console.error("Server error response:", content);
        throw new Error(content.message || "Failed to sign up");
      }

      console.log("Server success response:", content);

      return content;
    },
    mutationKey: ["auth", "signup"],
  });

const useSignOut = () =>
  useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const content = await res.json();

      if (!res.ok) {
        throw new Error(content.error || "Failed to sign out LOG FRONT");
      }

      return content;
    },
    mutationKey: ["auth", "signout"],
  });

export { useSignIn, useSignUp, useSignOut };
