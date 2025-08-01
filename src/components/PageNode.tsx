import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { type Page } from "../models";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type PageNode = Node<Page, "page">;

export const PageNode = ({ data }: NodeProps<PageNode>) => {
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
