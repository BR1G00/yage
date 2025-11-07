import useGamebookStore from "@/lib/stores/gamebook.store";
import type { Edge, Node } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export const useGraphManager = () => {
  const nodes = useGamebookStore((state) => state.nodes);
  const edges = useGamebookStore((state) => state.edges);
  const currentFilePath = useGamebookStore((state) => state.currentFilePath);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const setEdges = useGamebookStore((state) => state.setEdges);
  const setCurrentFilePath = useGamebookStore(
    (state) => state.setCurrentFilePath
  );

  const handleOpen = useCallback(
    (data: unknown) => {
      const { nodes, edges, filePath } = data as {
        nodes: Node[];
        edges: Edge[];
        filePath: string;
      };
      setNodes(nodes);
      setEdges(edges);
      setCurrentFilePath(filePath);
    },
    [setNodes, setEdges, setCurrentFilePath]
  );

  function stringifyData() {
    return JSON.stringify({ nodes, edges });
  }

  const handleSave = useCallback(() => {
    if (!currentFilePath) {
      handleSaveAs();
      return;
    }
    window?.electronAPI?.saveToPath?.(currentFilePath, stringifyData());
  }, [nodes, edges, currentFilePath]);

  const handleSaveAs = useCallback(() => {
    const blob = new Blob([stringifyData()], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gamebook.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  useEffect(() => {
    const cleanup = window?.electronAPI?.onOpen((data) => {
      try {
        handleOpen(data);
      } catch (error) {
        toast.error("Failed to open file");
        console.error("Failed to open file", error);
      }
    });

    return cleanup;
  }, [handleOpen]);

  useEffect(() => {
    const cleanup = window?.electronAPI?.onSave(() => {
      try {
        handleSave();
      } catch (error) {
        toast.error("Failed to save file");
        console.error("Failed to save file", error);
      }
    });

    const cleanupSuccess = window?.electronAPI?.onSaveSuccess?.(() => {
      toast.success("Saved");
    });

    const cleanupError = window?.electronAPI?.onSaveError?.((error) => {
      toast.error(`Failed to save file: ${error}`);
      console.error("Failed to save file", error);
    });

    return () => {
      cleanup?.();
      cleanupSuccess?.();
      cleanupError?.();
    };
  }, [handleSave]);

  useEffect(() => {
    const cleanup = window?.electronAPI?.onSaveAs(() => {
      try {
        handleSaveAs();
      } catch (error) {
        toast.error("Failed to save file");
        console.error("Failed to save file", error);
      }
    });

    return cleanup;
  }, [handleSaveAs]);
};
