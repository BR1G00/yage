import { memo } from "react";
import { Position, NodeToolbar } from "@xyflow/react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToolTipBar = ({
  data,
  onDelete,
}: {
  data: {
    toolbarVisible: boolean;
    toolbarPosition: Position;
  };
  onDelete?: () => void;
}) => {
  return (
    <>
      <NodeToolbar
        isVisible={data.toolbarVisible}
        position={data.toolbarPosition}
        className="flex gap-1 p-1 bg-background border rounded-lg shadow-lg"
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-destructive hover:text-white cursor-pointer"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </NodeToolbar>
    </>
  );
};

export default memo(ToolTipBar);
