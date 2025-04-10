import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AppError } from "@/lib/errors";

const fetchUser = async () => {
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

  return {
    image: data.user?.image ?? "",
    name: data.user?.username ?? "User",
    email: data.user?.email ?? "random",
  };
};

export const useGetUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 1,
  });

