"use client";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
  useFormField,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSignIn } from "@/hooks/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaTypes } from "@/schemas";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SignIn() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserSchema.signIn),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { mutate, isPending } = useSignIn();

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

        <FormField
          name="remember"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center">
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
