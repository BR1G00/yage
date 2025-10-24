import {
  NodeResizer,
  Position,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { useState } from "react";
import { type Choice } from "../../models";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";
import CustomHandle from "../CustomHandle";
import ToolTipBar from "../ToolTipBar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export type ChoiceNode = Node<Choice, "choice">;

export const ChoiceNode = ({ data, selected, id }: NodeProps<ChoiceNode>) => {
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
        title="Delete Choice Node"
        description={`This will permanently delete the choice node "${data.title}". This action cannot be undone.`}
      />
      <ToolTipBar
        data={{
          toolbarVisible: selected,
          toolbarPosition: Position.Top,
        }}
        onDelete={handleDelete}
      />
      <Card
        className={`bg-blue-100 min-w-60 min-h-40 w-full h-full ${
          selected ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden">
          <p>{data.content}</p>
          <CustomHandle
            type="source"
            position={Position.Right}
            connectionCount={1}
          />
          <CustomHandle type="target" position={Position.Left} />
        </CardContent>
      </Card>
    </>
  );
};
