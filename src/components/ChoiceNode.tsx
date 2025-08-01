import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { type Choice } from "../models";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ChoiceNode = Node<Choice, "choice">;

export const ChoiceNode = ({ data }: NodeProps<ChoiceNode>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.content}</p>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </CardContent>
    </Card>
  );
};
