import useGamebookStore from "@/lib/stores/gamebook.store";
import type { Edge, Node } from "@xyflow/react";
import { useCallback, useEffect } from "react";

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
            handleOpen(data);
        });

        return cleanup;
    }, [handleOpen]);

    useEffect(() => {
        const cleanup = window?.electronAPI?.onSave(() => {
            handleSave();
        });

        return cleanup;
    }, [handleSave]);
}