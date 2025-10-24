import {
  NodeResizer,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useState } from "react";
import { type Page, type PageType } from "../../models";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import CustomHandle from "../CustomHandle";
import ToolTipBar from "../ToolTipBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type PageNode = Node<Page, "page">;
const pageHeaders: Record<
  PageType,
  { description: string; color: string } | null
> = {
  start: { description: "Start Page", color: "green" },
  end: { description: "End Page", color: "red" },
  normal: null,
};
export const PageNode = ({ data, selected, id }: NodeProps<PageNode>) => {
  const { deleteElements } = useReactFlow();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteElements({ nodes: [{ id }] });
    setShowDeleteDialog(false);
  };

  return (
    <>
      <NodeResizer isVisible={selected} minWidth={240} minHeight={160} />
      <ConfirmDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Page Node"
        description={`This will permanently delete the page node "${data.title}". This action cannot be undone.`}
      />
      <ToolTipBar
        data={{
          toolbarVisible: selected && data.type !== "start",
          toolbarPosition: Position.Top,
        }}
        onDelete={handleDelete}
      />
      <Card
        className={`min-w-60 min-h-40 w-full h-full ${
          selected ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          {pageHeaders[data.type]?.description && (
            <CardDescription style={{ color: pageHeaders[data.type]?.color }}>
              {pageHeaders[data.type]?.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p>{data.content}</p>
          {(data.type === "start" || data.type === "normal") && (
            <CustomHandle type="source" position={Position.Right} />
          )}
          {(data.type === "end" || data.type === "normal") && (
            <CustomHandle type="target" position={Position.Left} />
          )}
        </CardContent>
      </Card>
    </>
  );
};
