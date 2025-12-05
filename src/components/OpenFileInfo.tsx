import { FileText } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const FileName = ({ fileName }: { fileName: string }) => {
  return (
    <div className="text-sm text-gray-500 cursor-default w-fit flex items-center gap-1.5">
      {fileName}
      <FileText className="w-4 h-4" />
    </div>
  );
};

const OpenFileInfo = ({ filePath }: { filePath: string | null }) => {
  const getBasename = useCallback((filePath: string | null) => {
    if (!filePath) return "untitled";
    const basename = filePath.split(/[\\/]/).pop() || "untitled";
    if (basename.length > 50) {
      return `${basename.slice(0, 10)}...${basename.slice(-10)}`;
    }
    return basename;
  }, []);

  const fileName = useMemo(
    () => getBasename(filePath),
    [getBasename, filePath]
  );

  if (!filePath) return <FileName fileName={fileName} />;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <FileName fileName={fileName} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{filePath}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default OpenFileInfo;
