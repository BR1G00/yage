import { Position, type Edge, type Node } from "@xyflow/react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GamebookStore {
  nodes: Node[];
  edges: Edge[];
  currentFilePath: string | null;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setCurrentFilePath: (path: string | null) => void;
  addPageNode: () => void;
  addChoiceNode: () => void;
}
const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 600 },
    data: {
      type: "start",
      title: "Page 1",
      content: "",
    },
    type: "page",
    ...nodeDefaults,
  },
];

const initialEdges: Edge[] = [];

const useGamebookStore = create<GamebookStore>()(
  persist(
    (set) => ({
      nodes: initialNodes,
      edges: initialEdges,
      currentFilePath: null,
      setNodes: (nodes: Node[]) => set({ nodes }),
      setEdges: (edges: Edge[]) => set({ edges }),
      setCurrentFilePath: (path: string | null) => set({ currentFilePath: path }),
      addPageNode: () =>
        set((state) => ({
          nodes: [
            ...state.nodes,
            {
              id: crypto.randomUUID(),
              type: "page",
              position: { x: 0, y: 0 },
              data: { type: "normal", title: "Nuova Pagina", content: "" },
              ...nodeDefaults,
            },
          ],
        })),
      addChoiceNode: () =>
        set((state) => ({
          nodes: [
            ...state.nodes,
            {
              id: crypto.randomUUID(),
              type: "choice",
              position: { x: 0, y: 0 },
              data: { title: "Nuova Scelta", content: "" },
              ...nodeDefaults,
            },
          ],
        })),
    }),
    {
      name: "gamebook-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGamebookStore;
