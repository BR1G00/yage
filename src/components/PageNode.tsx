import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { type Page, type PageType } from "../models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import CustomHandle from "./CustomHandle";

type PageNode = Node<Page, "page">;
const pageHeaders: Record<
  PageType,
  { description: string; color: string } | null
> = {
  start: { description: "Start Page", color: "green" },
  end: { description: "End Page", color: "red" },
  normal: null,
};
export const PageNode = ({ data, selected }: NodeProps<PageNode>) => {
  return (
    <Card
      className={`min-w-80 min-h-60 ${
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
  );
};
