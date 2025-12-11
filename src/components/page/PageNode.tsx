import {
  NodeResizer,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { Flag, Play } from "lucide-react";
import { useState } from "react";
import { type Page, type PageType } from "../../models";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import CustomHandle from "../CustomHandle";
import ToolTipBar from "../ToolTipBar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export type PageNode = Node<Page, "page">;

const pageStyles: Record<
  PageType,
  {
    headerBg: string;
    icon: React.ReactNode;
    badge: React.ReactNode;
  } | null
> = {
  start: {
    headerBg: "bg-green-50",
    icon: <Play className="w-4 h-4 text-green-600" />,
    badge: <Badge className="bg-green-600 text-white text-xs">Start</Badge>,
  },
  end: {
    headerBg: "bg-amber-100",
    icon: <Flag className="w-4 h-4 text-amber-600" />,
    badge: (
      <Badge
        variant="outline"
        className="text-xs text-amber-600 border-amber-600"
      >
        End
      </Badge>
    ),
  },
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

  const style = pageStyles[data.type];
  const borderColor = "border-gray-300";

  return (
    <>
      <NodeResizer isVisible={selected} minWidth={320} minHeight={500} />
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
        className={`min-w-60 min-h-40 w-full h-full flex flex-col gap-1 border-2 ${
          selected ? "border-blue-500 shadow-lg" : borderColor
        } pt-0`}
      >
        <CardHeader className="py-3 rounded-t-xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              {style?.icon}
              <CardTitle className="text-base">{data.title}</CardTitle>
            </div>
            {style?.badge}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-2 p-4 overflow-hidden">
          {data.content && (
            <div className="flex-1 overflow-y-auto min-h-32">
              <p className="text-sm text-gray-700 leading-relaxed break-words">
                {data.content}
              </p>
            </div>
          )}

          {data.image && !imageError && (
            <div className="relative w-full min-w-[200px] min-h-[200px] overflow-hidden ">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-contain"
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
