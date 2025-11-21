import useGamebookStore from "@/lib/stores/gamebook.store";
import { useReactFlow } from "@xyflow/react";
import { GitBranch, Play, StickyNote } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PlayStory } from "./PlayStory";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

const ToolBar = () => {
  const addPageNode = useGamebookStore((state) => state.addPageNode);
  const addChoiceNode = useGamebookStore((state) => state.addChoiceNode);
  const { screenToFlowPosition } = useReactFlow();
  const nodes = useGamebookStore((state) => state.nodes);
  const edges = useGamebookStore((state) => state.edges);
  const [dialogOpen, setDialogOpen] = useState(false);

  const canPlayStory = useMemo(() => {
    const hasStartPage = nodes.some(
      (node) => node.type === "page" && node.data.type === "start"
    );

    const hasConnections = edges.length > 0;

    return hasStartPage && hasConnections;
  }, [nodes, edges]);

  const handleNewPage = () => {
    const viewportCenter = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    addPageNode({
      position: {
        x: viewportCenter.x,
        y: viewportCenter.y,
      },
    });
  };

  const handleNewChoice = () => {
    const viewportCenter = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    addChoiceNode({
      position: {
        x: viewportCenter.x,
        y: viewportCenter.y,
      },
    });
  };

  const handlePlayClick = () => {
    if (!canPlayStory) {
      toast.error(
        "Collega almeno una scelta per far partire la modalità di gioco!"
      );
      return;
    }
    setDialogOpen(true);
  };

  return (
    <div className="flex bg-gray-100 p-2 gap-2">
      <Button variant="outline" size="sm" onClick={handleNewPage}>
        <StickyNote /> New Page
      </Button>
      <Button variant="outline" size="sm" onClick={handleNewChoice}>
        <GitBranch /> New Choice
      </Button>

      <Button variant="outline" size="sm" onClick={handlePlayClick}>
        <Play /> Play Story
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="!max-w-[90vw] h-[90vh] p-0 flex flex-col overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <PlayStory />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToolBar;
