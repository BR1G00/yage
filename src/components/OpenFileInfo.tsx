import { FileText } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const OpenFileInfo = ({ filePath }: { filePath: string | null }) => {
  function getBasename(filePath: string | null) {
    if (!filePath) return "untitled";
    return filePath.split(/[\\/]/).pop();
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
