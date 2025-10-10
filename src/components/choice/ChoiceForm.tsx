import type { Choice } from "@/models";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { NodeFormFields } from "../NodeFormFields";

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
        <NodeFormFields<Choice> form={form} />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};
