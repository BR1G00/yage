import type { Choice } from "@/models";

export const ChoiceForm = ({ choice }: { choice: Choice }) => {
  return (
    <div>
      <span>{choice.title}</span>
      <span>{choice.content}</span>
    </div>
  );
};
