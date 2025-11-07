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
  const [imageError, setImageError] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteElements({ nodes: [{ id }] });
    setShowDeleteDialog(false);
  };

  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={320}
        minHeight={400}
        maxWidth={700}
        maxHeight={600}
      />
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
        className={`min-w-60 min-h-40 w-full h-full flex flex-col gap-1 ${
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
        <CardContent className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
          {data.content && (
            <div className="flex-1 overflow-y-auto min-h-4">
              <p className="text-sm text-gray-700 leading-relaxed break-words">
                {data.content}
              </p>
            </div>
          )}

          {data.image && !imageError && (
            <div className="relative w-full h-56 bg-gray-100 rounded-sm overflow-hidden  mt-2">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          )}

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
