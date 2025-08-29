import { CircleDot, StickyNote } from "lucide-react";
import { Button } from "./ui/button";
import useGamebookStore from "@/lib/stores/gamebook.store";

const ToolBar = () => {
  const addPageNode = useGamebookStore((state) => state.addPageNode);
  const addChoiceNode = useGamebookStore((state) => state.addChoiceNode);
  const handleNewPage = () => {
    addPageNode();
  };

  const handleNewChoice = () => {
    addChoiceNode();
  };

  return (
    <div className="flex bg-gray-100 p-2">
      <Button variant="outline" size="sm" onClick={handleNewPage}>
        <StickyNote /> New Page
      </Button>
      <Button variant="outline" size="sm" onClick={handleNewChoice}>
        <CircleDot /> New Choice
      </Button>
    </div>
  );
};

export default ToolBar;
