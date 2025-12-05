import { FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const OpenFileInfo = ({ filePath }: { filePath: string | null }) => {
  function getBasename(filePath: string | null) {
    if (!filePath) return "untitled";
    const basename = filePath.split(/[\\/]/).pop() || "untitled";
    if (basename.length > 50) {
      return `${basename.slice(0, 10)}...${basename.slice(-10)}`;
    }
    return basename;
  }

  const fileName = getBasename(filePath);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="text-sm text-gray-500 cursor-default w-fit flex items-center gap-1.5">
          {fileName}
          <FileText className="w-4 h-4" />
        </div>
      </TooltipTrigger>
      {filePath && (
        <TooltipContent>
          <p>{filePath}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default OpenFileInfo;
