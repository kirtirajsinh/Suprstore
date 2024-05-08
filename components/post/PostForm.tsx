"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";

const communityList: { id: number; value: string; label: string }[] = [
  {
    id: 1,
    value: "Hangout India",
    label: "Hangout India",
  },
  {
    id: 2,
    value: "Parkour",
    label: "Parkour",
  },
];

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(500),
  productUrl: z.string().url({ message: "Invalid url" }),
  channelId: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  image: z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "Image file size must be less than 10MB",
  }),
});

const PostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      productUrl: "",
      channelId: [],
      image: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>Add the PRoduct title</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>Add the PRoduct Description</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>Add the PRoduct URL</FormDescription>
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="channelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Community</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    multiple
                    onChange={(e) => {
                      const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      field.onChange(selectedOptions); // Update form field value directly
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a community</option>
                    {communityList.map((community) => (
                      <option key={community.id} value={community.value}>
                        {community.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription>
                  Select a community you want to launch/sell your product in
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.channelId?.message}
                </FormMessage>
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="channelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Community</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    multiple
                    value={field.value || []} // Set initial value to an empty array if field.value is falsy
                    onChange={(e) => {
                      const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      );
                      field.onChange(selectedOptions); // Update form field value directly
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a community</option>
                    {communityList.map((community) => (
                      <option key={community.id} value={community.value}>
                        {community.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormDescription>
                  Select a community you want to launch/sell your product in
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.channelId?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]); // update the field with file
                    }}
                  />
                </FormControl>
                <FormDescription>Upload an image</FormDescription>
                <FormMessage>
                  {form.formState.errors.image?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
