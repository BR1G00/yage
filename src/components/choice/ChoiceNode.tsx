import {
  Position,
  type Node,
  type NodeProps,
  useReactFlow,
} from "@xyflow/react";
import { type Choice } from "../../models";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CustomHandle from "../CustomHandle";
import ToolTipBar from "../ToolTipBar";
import { useState } from "react";
import { ConfirmDeleteDialog } from "../ConfirmDeleteDialog";

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
        className={`bg-blue-100 min-w-60 min-h-40 ${
          selected ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
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
