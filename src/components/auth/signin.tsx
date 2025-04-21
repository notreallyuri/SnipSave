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
import { useSignIn } from "@/hooks/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaTypes } from "@/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignIn() {
  const router = useRouter();

  const form = useForm<UserSchemaTypes["signIn"]>({
    resolver: zodResolver(UserSchema["signIn"]),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useSignIn();

  const onSubmit = async (data: UserSchemaTypes["signIn"]) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Logged in successfully");
        router.push("/home");
      },
      onError: (error: any) => {
        toast.error(error.message || "Something went wrong");
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
        <Button
          type="submit"
          className="w-full cursor-pointer bg-emerald-500 text-white hover:bg-emerald-400"
        >
          Enter
        </Button>
      </form>
    </Form>
  );
}
