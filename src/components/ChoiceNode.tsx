import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { type Choice } from "../models";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CustomHandle from "./CustomHandle";

type ChoiceNode = Node<Choice, "choice">;

export const ChoiceNode = ({ data }: NodeProps<ChoiceNode>) => {
  return (
    <Card className="bg-blue-100 min-w-60 min-h-40">
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
  );
};
