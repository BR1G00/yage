import useGamebookStore from "@/lib/stores/gamebook.store";
import { useReactFlow } from "@xyflow/react";
import { GitBranch, Play, StickyNote } from "lucide-react";
import { PlayStory } from "./PlayStory";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const ToolBar = () => {
  const addPageNode = useGamebookStore((state) => state.addPageNode);
  const addChoiceNode = useGamebookStore((state) => state.addChoiceNode);
  const { screenToFlowPosition } = useReactFlow();

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

  return (
    <div className="flex bg-gray-100 p-2 gap-2">
      <Button variant="outline" size="sm" onClick={handleNewPage}>
        <StickyNote /> New Page
      </Button>
      <Button variant="outline" size="sm" onClick={handleNewChoice}>
        <GitBranch /> New Choice
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Play /> Play Story
          </Button>
        </DialogTrigger>
        <DialogContent>
          <PlayStory />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToolBar;
