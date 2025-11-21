// components/NodeSidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import useGamebookStore from "@/lib/stores/gamebook.store";
import type { Choice, Page } from "@/models";
import { FileText, GitBranch, XIcon } from "lucide-react";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { ChoiceForm } from "./choice/ChoiceForm";
import type { ChoiceNode } from "./choice/ChoiceNode";
import { PageForm } from "./page/PageForm";
import type { PageNode } from "./page/PageNode";
import { Button } from "./ui/button";

export function NodeSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & {}) {
  const nodes = useGamebookStore((state) => state.nodes);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const { setOpen } = useSidebar();
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
      setOpen(true);

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
      setOpen(false);
    }
  }, [selectedNode, handleSubmit, setOpen]);

  const nodeTypeConfig = {
    page: { icon: FileText, label: "Page Node", color: "text-blue-500" },
    choice: { icon: GitBranch, label: "Choice Node", color: "text-purple-500" },
  };

  const config = selectedNode ? nodeTypeConfig[selectedNode.type] : null;
  const Icon = config?.icon;

  return (
    <Sidebar className={`border-l `} {...props}>
      {selectedNode && config && Icon && (
        <SidebarHeader className="border-b p-4 flex flex-row justify-between items-center">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setNodes(nodes.map((node) => ({ ...node, selected: false })));
            }}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </SidebarHeader>
      )}
      <SidebarContent className="p-0">{selectedNodeContent}</SidebarContent>
    </Sidebar>
  );
}
