import useGamebookStore from "@/lib/stores/gamebook.store";
import { GitBranch, Play, StickyNote } from "lucide-react";
import { PlayStory } from "./PlayStory";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const ToolBar = () => {
  const setAddMode = useGamebookStore((state) => state.setAddMode);

  const handleNewPage = () => {
    setAddMode("page");
    const reactFlowWrapper = document.querySelector(
      ".react-flow__pane"
    ) as HTMLElement;
    if (reactFlowWrapper) {
      const svgCursor = `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z'/%3e%3cpath d='m15 3 6 6'/%3e%3c/svg%3e`;
      reactFlowWrapper.style.setProperty(
        "cursor",
        `url("${svgCursor}") 12 12, default`,
        "important"
      );
    }
  };

  const handleNewChoice = () => {
    setAddMode("choice");
    const reactFlowWrapper = document.querySelector(
      ".react-flow__pane"
    ) as HTMLElement;
    if (reactFlowWrapper) {
      const svgCursor = `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cline x1='6' y1='3' x2='6' y2='15'/%3e%3ccircle cx='18' cy='6' r='3'/%3e%3ccircle cx='6' cy='18' r='3'/%3e%3cpath d='M18 9a9 9 0 0 1-9 9'/%3e%3c/svg%3e`;
      reactFlowWrapper.style.setProperty(
        "cursor",
        `url("${svgCursor}") 12 12, default`,
        "important"
      );
    }
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
