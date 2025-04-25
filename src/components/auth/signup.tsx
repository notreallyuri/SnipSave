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
import { Checkbox } from "../ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaTypes } from "@/schemas";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/hooks/fetch";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SignUp() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserSchema.signUp),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      remember: false,
    },
  });

  const { mutate, isPending } = useSignUp();

  const onSubmit = async (data: UserSchemaTypes["create"]) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully");
        router.push("/home");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create account");
      },
    });
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
        <FormField
          name="remember"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
