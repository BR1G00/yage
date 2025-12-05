const OpenFileInfo = ({ filePath }: { filePath: string | null }) => {
  function getBasename(filePath: string | null) {
    if (!filePath) return "untitled";
    return filePath.split(/[\\/]/).pop();
  }

  const fileName = getBasename(filePath);
  return <div className="text-sm text-gray-500">{fileName}</div>;
};

export default OpenFileInfo;
