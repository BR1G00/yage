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
        <NodeFormFields<Choice> form={form}>
          {/* example of how you can extend with other fields
            <FormField
            control={form.control}
            name="choice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <FormControl>
                  <Input placeholder="Enter condition" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </NodeFormFields>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};
