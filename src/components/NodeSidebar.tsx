// components/NodeSidebar.tsx
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import useGamebookStore from "@/lib/stores/gamebook.store";
import { useMemo } from "react";
import type { PageNode } from "./page/PageNode";
import type { ChoiceNode } from "./choice/ChoiceNode";
import { PageForm } from "./page/PageForm";
import { ChoiceForm } from "./choice/ChoiceForm";
import type { Choice, Page } from "@/models";
import { FileText, GitBranch } from "lucide-react";

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
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No Node Selected</h3>
        <p className="text-sm">
          Select a node from the graph to edit its properties
        </p>
      </div>
    );
  }, [selectedNode]);

  const nodeTypeConfig = {
    page: { icon: FileText, label: "Page Node", color: "text-blue-500" },
    choice: { icon: GitBranch, label: "Choice Node", color: "text-purple-500" },
  };

  const config = selectedNode ? nodeTypeConfig[selectedNode.type] : null;
  const Icon = config?.icon;

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex w-full"
      {...props}
    >
      {selectedNode && config && Icon && (
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-3">
            <div className={`${config.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">{config.label}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedNode.data.title || "Untitled"}
              </p>
            </div>
          </div>
        </SidebarHeader>
      )}
      <SidebarContent className="p-0">{selectedNodeContent}</SidebarContent>
    </Sidebar>
  );
}
