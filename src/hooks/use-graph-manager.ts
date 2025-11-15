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
  const reset = useGamebookStore((state) => state.reset);
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

  const handleSaveAs = useCallback(
    async (filePath: string) => {
      const result = await window?.electronAPI?.saveToPath?.(
        filePath,
        stringifyData()
      );
      console.log("result:\t", result);
      if (result) {
        setCurrentFilePath(filePath);
        toast.success("File saved");
      } else {
        toast.error("Failed to save file");
      }
    },
    [nodes, edges, setCurrentFilePath]
  );

  //onOpen
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

  //onSaveAs
  useEffect(() => {
    const cleanup = window?.electronAPI?.onSaveAs(async (filePath) => {
      try {
        await handleSaveAs(filePath);
      } catch (error) {
        toast.error("Failed to save file");
        console.error("Failed to save file", error);
      }
    });

    return cleanup;
  }, [handleSaveAs]);

  useEffect(() => {
    const cleanup = window?.electronAPI?.onNew(() => {
      reset();
    });
    return cleanup;
  }, [reset]);
};
