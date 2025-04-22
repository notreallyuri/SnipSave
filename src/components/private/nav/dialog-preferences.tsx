"use client";
import { useTheme } from "next-themes";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../ui/select";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useGetPreferences, useUpdatePreferences } from "@/hooks/fetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserSchemaTypes } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";

import pref from "@/config/preferences.json";
import React from "react";

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { setTheme } = useTheme();
  const { data, isLoading } = useGetPreferences();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();

  const preferences: UserSchemaTypes["preferences"] = data;

  React.useEffect(() => {
    console.log("Fetched Data:", data);
    console.log("Extracted Preferences:", preferences);
  }, [data]);

  const form = useForm<UserSchemaTypes["preferences"]>({
    resolver: zodResolver(UserSchema["preferences"]),
    defaultValues: preferences,
    values: preferences,
  });

  React.useEffect(() => {
    if (data?.preferences) {
      form.reset(preferences);
      console.log("Editor preference:", preferences.editorTheme);
    }
  }, [data, form]);

  const {
    languages,
    codeLanguages,
    themes,
    editorThemes,
    snippetVisibilities,
  } = pref;

  const onSubmit = async (data: UserSchemaTypes["preferences"]) => {
    updatePreferences(data, {
      onSuccess: () => {
        setTheme(data.themePreference ?? "system");
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit preferences</DialogTitle>
          <DialogDescription>
            Make changes to your account preferences here. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Language</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="col-span-2 col-start-3 w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => {
                          const [label, value] = Object.entries(lang)[0];
                          return (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="col-span-4 col-start-1" />
                </FormItem>
              )}
            />

            <FormField
              name="themePreference"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Theme</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="col-span-2 col-start-3 w-full">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => {
                          const [label, value] = Object.entries(theme)[0];

                          return (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="defaultCodeLanguage"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="col-span-2 text-left">
                    Code Language
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="col-span-2 col-start-3 w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {codeLanguages.map((lang) => {
                          const [label, value] = Object.entries(lang)[0];

                          return (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="editorTheme"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="col-span-2 text-left">
                    Editor theme
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="col-span-2 col-start-3 w-full">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {editorThemes.map((theme) => {
                          const [label, value] = Object.entries(theme)[0];

                          return (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="defaultSnippetVisibility"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="col-span-2 text-left">
                    Snippets Visibility
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="col-span-2 col-start-3 w-full">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        {snippetVisibilities.map((visibility) => {
                          const [label, value] = Object.entries(visibility)[0];

                          return (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
