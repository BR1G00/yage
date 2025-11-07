import useGamebookStore from "@/lib/stores/gamebook.store";
import type { Edge, Node } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

export const useGraphManager = () => {
  const nodes = useGamebookStore((state) => state.nodes);
  const edges = useGamebookStore((state) => state.edges);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const setEdges = useGamebookStore((state) => state.setEdges);

  const handleOpen = useCallback(
    (data: unknown) => {
      const { nodes, edges } = data as { nodes: Node[]; edges: Edge[] };
      setNodes(nodes);
      setEdges(edges);
    },
    [setNodes, setEdges]
  );

  const handleSave = useCallback(() => {
    // Path hardcoded per il salvataggio
    const savePath = "temp/gamebook-1.json";
    // Invia i dati e il path al main process per salvare
    window?.electronAPI?.saveToPath?.(savePath, { nodes, edges });
  }, [nodes, edges]);

  const handleSaveAs = useCallback(() => {
    const blob = new Blob([JSON.stringify({ nodes, edges })], {
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
      toast.success("Gamebook saved");
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
