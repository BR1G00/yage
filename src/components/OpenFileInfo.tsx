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
        <div className="text-xs text-gray-500 cursor-defaultw-fit">
          {fileName}
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
