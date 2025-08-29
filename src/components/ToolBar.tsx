import { CircleDot, StickyNote } from "lucide-react";
import { Button } from "./ui/button";

const ToolBar = () => {
  return (
    <div className="flex bg-gray-100 p-2">
      <Button variant="outline" size="sm">
        <StickyNote /> New Page
      </Button>
      <Button variant="outline" size="sm">
        <CircleDot /> New Choice
      </Button>
    </div>
  );
};

export default ToolBar;
