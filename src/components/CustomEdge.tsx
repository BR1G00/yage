import { memo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
} from "@xyflow/react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeDelete = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-background border rounded-lg shadow-lg hover:bg-destructive hover:text-white cursor-pointer"
              onClick={onEdgeDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(CustomEdge);
