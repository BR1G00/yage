import { useEffect, useRef } from "react";
import type { Choice } from "@/models";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const ChoiceForm = ({
  choice,
  onSubmit,
}: {
  choice: Choice;
  onSubmit: (choice: Choice) => void;
}) => {
  const form = useForm<Choice>({
    values: {
      title: choice.title,
      content: choice.content,
    },
  });

  const watchedValues = form.watch();

  useEffect(() => {
    if (form.formState.isDirty) {
      onSubmit(watchedValues);
    }
  }, [watchedValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-4 p-6"
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content"
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
