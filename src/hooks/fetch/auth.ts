import { useMutation } from "@tanstack/react-query";
import { UserSchemaTypes } from "@/schemas";

function useSignIn() {
  const mutation = async (data: UserSchemaTypes["signIn"]) => {
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
  };

  return useMutation({
    mutationFn: mutation,
    mutationKey: ["signIn"],
    onSuccess: (data) => {
      console.log("Sign in successful:", data);
    },
    onError: (error) => {
      console.error("Error signing in:", error);
    },
  });
}

function useSignUp() {
  const mutation = async (data: UserSchemaTypes["create"]) => {
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
  };

  return useMutation({
    mutationFn: mutation,
    mutationKey: ["signUp"],
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
    },
    onError: (error) => {
      console.error("Error signing up query:", error);
    },
  });
}

function useSignOut() {
  const mutation = async () => {
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
  };

  return useMutation({
    mutationFn: mutation,
    mutationKey: ["signOut"],
    onSuccess: () => {
      console.log("Sign out successful");
    },
    onError: (error) => {
      console.error("Error signing out:", error);
    },
  });
}

export { useSignIn, useSignUp, useSignOut };
