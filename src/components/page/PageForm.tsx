import type { Page } from "@/models";

export const PageForm = ({ page }: { page: Page }) => {
  return (
    <div>
      <span>{page.title}</span>
      <span>{page.content}</span>
      <span>{page.type}</span>
    </div>
  );
};
