// components/NodeSidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useGamebookStore from "@/lib/stores/gamebook.store";
import type { Choice, Page } from "@/models";
import {
  FileText,
  GitBranch,
  SquareDashedMousePointerIcon,
} from "lucide-react";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { ChoiceForm } from "./choice/ChoiceForm";
import type { ChoiceNode } from "./choice/ChoiceNode";
import { PageForm } from "./page/PageForm";
import type { PageNode } from "./page/PageNode";

export function NodeSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & {}) {
  const nodes = useGamebookStore((state) => state.nodes);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const selectedNode: PageNode | ChoiceNode | undefined = useMemo(
    () =>
      nodes.find((node) => node.selected) as PageNode | ChoiceNode | undefined,
    [nodes]
  );

  const handleSubmit = useCallback(
    (data: Choice | Partial<Page>) => {
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
    },
    [nodes, selectedNode, setNodes]
  );

  const selectedNodeContent = useMemo(() => {
    if (selectedNode) {
      if (selectedNode.type === "page") {
        return (
          <PageForm
            key={selectedNode.id}
            page={selectedNode.data}
            onSubmit={handleSubmit}
          />
        );
      }

      if (selectedNode.type === "choice") {
        return (
          <ChoiceForm
            key={selectedNode.id}
            choice={selectedNode.data}
            onSubmit={handleSubmit}
          />
        );
      }
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-2">
          <SquareDashedMousePointerIcon className="w-10 h-10 text-gray-500" />
          <p className="text-lg font-medium text-gray-500">No node selected</p>
          <p className="text-sm text-gray-500">Click on a node to edit it.</p>
        </div>
      );
    }
  }, [selectedNode, handleSubmit]);

  const nodeTypeConfig = {
    page: {
      icon: FileText,
      label: "Page Node",
      color: "text-blue-500",
      backgroundColor: "bg-blue-100",
    },
    choice: {
      icon: GitBranch,
      label: "Choice Node",
      color: "text-purple-500",
      backgroundColor: "bg-purple-100",
    },
  };

  const config = selectedNode ? nodeTypeConfig[selectedNode.type] : null;
  const Icon = config?.icon;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {selectedNode && config && Icon && (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2">
                <div
                  className={`${config.backgroundColor} flex aspect-square size-8 items-center justify-center rounded-lg`}
                >
                  <Icon className={`size-4 ${config.color}`} />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">
                    {selectedNode.data.title || "Untitled"}
                  </span>
                  {selectedNode.type === "page" && (
                    <span className="text-xs text-gray-500 first-letter:uppercase">
                      {selectedNode.data.type}
                    </span>
                  )}
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}
      <SidebarContent>{selectedNodeContent}</SidebarContent>
    </Sidebar>
  );
}
