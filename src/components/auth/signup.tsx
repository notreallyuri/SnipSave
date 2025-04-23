"use client";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaTypes } from "@/schemas";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/hooks/fetch";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignUp() {
  const router = useRouter();

  const form = useForm<UserSchemaTypes["signUp"]>({
    resolver: zodResolver(UserSchema["signUp"]),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate } = useSignUp();

  const onSubmit = async (data: UserSchemaTypes["signUp"]) => {
    console.log("Submitting data:", data);
    const { confirmPassword, ...payload } = data;

    mutate(
      {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully");
          router.push("/home");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create account");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full cursor-pointer bg-emerald-500 text-white hover:bg-emerald-400"
          type="submit"
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
