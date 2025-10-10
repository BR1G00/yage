import type { Page } from "@/models";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { NodeFormFields } from "../NodeFormFields";

export const PageForm = ({
  page,
  onSubmit,
}: {
  page: Page;
  onSubmit: (page: Partial<Page>) => void;
}) => {
  const form = useForm<Partial<Page>>({
    values: {
      title: page.title,
      content: page.content,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
        <NodeFormFields<Partial<Page>> form={form} />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};
