import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useGamebookStore from "@/lib/stores/gamebook.store";
import { useMemo } from "react";
import type { PageNode } from "./page/PageNode";
import type { ChoiceNode } from "./choice/ChoiceNode";
import { PageForm } from "./page/PageForm";
import { ChoiceForm } from "./choice/ChoiceForm";
import type { Choice, Page } from "@/models";

export function NodeSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const nodes = useGamebookStore((state) => state.nodes);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const selectedNode: PageNode | ChoiceNode | undefined = useMemo(
    () =>
      nodes.find((node) => node.selected) as PageNode | ChoiceNode | undefined,
    [nodes]
  );

  const handleSubmit = (data: Choice | Partial<Page>) => {
    setNodes(
      nodes.map((node) =>
        node.id === selectedNode?.id
          ? {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            }
          : node
      )
    );
  };

  const selectedNodeContent = useMemo(() => {
    if (selectedNode?.type === "page") {
      return <PageForm page={selectedNode.data} onSubmit={handleSubmit} />;
    }
    if (selectedNode?.type === "choice") {
      return <ChoiceForm choice={selectedNode.data} onSubmit={handleSubmit} />;
    }
    return <div>No node selected</div>;
  }, [selectedNode]);

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex w-full"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border h-16 border-b"></SidebarHeader>
      <SidebarContent>{selectedNodeContent}</SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
