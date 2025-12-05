import gitBranchIcon from "@/assets/git-branch.svg?url";
import stickyNoteIcon from "@/assets/sticky-note.svg?url";
import useGamebookStore from "@/lib/stores/gamebook.store";
import { GitBranchIcon, PlayIcon, StickyNoteIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PlayStory } from "./PlayStory";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Separator } from "./ui/separator";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const ToolBar = () => {
  const { state } = useSidebar();
  const setAddMode = useGamebookStore((state) => state.setAddMode);
  const nodes = useGamebookStore((state) => state.nodes);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const edges = useGamebookStore((state) => state.edges);
  const [dialogOpen, setDialogOpen] = useState(false);

  const canPlayStory = useMemo(() => {
    const hasStartPage = nodes.some(
      (node) => node.type === "page" && node.data.type === "start"
    );

    const hasConnections = edges.length > 0;

    return hasStartPage && hasConnections;
  }, [nodes, edges]);

  const setCursorIcon = (svgUrl: string) => {
    const reactFlowWrapper = document.querySelector(
      ".react-flow__pane"
    ) as HTMLElement;
    if (reactFlowWrapper) {
      reactFlowWrapper.style.setProperty(
        "cursor",
        `url("${svgUrl}") 12 12, default`,
        "important"
      );
    }
  };

  const handleNewPage = () => {
    setNodes(nodes.map((node) => ({ ...node, selected: false })));
    setAddMode("page");
    setCursorIcon(stickyNoteIcon);
  };

  const handleNewChoice = () => {
    setNodes(nodes.map((node) => ({ ...node, selected: false })));
    setAddMode("choice");
    setCursorIcon(gitBranchIcon);
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
    <header className="flex h-16 shrink-0 items-center gap-2 bg-white border-b">
      <div className="flex items-center gap-2 px-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1" />
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              <p>{state === "expanded" ? "Close" : "Open"} Node Sidebar</p>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>B</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <Button variant="outline" size="sm" onClick={handleNewPage}>
          <StickyNoteIcon /> New Page
        </Button>
        <Button variant="outline" size="sm" onClick={handleNewChoice}>
          <GitBranchIcon /> New Choice
        </Button>

        <Button variant="outline" size="sm" onClick={handlePlayClick}>
          <PlayIcon /> Play Story
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent
            className="!max-w-[90vw] h-[80vh] p-0 flex flex-col overflow-hidden"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <PlayStory />
            <DialogTitle className="sr-only">Play Story Mode</DialogTitle>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default ToolBar;
