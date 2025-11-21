import { Position, type Edge, type Node } from "@xyflow/react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AddNodeProps {
  id?: string;
  position?: { x: number; y: number };
}
interface GamebookStore {
  nodes: Node[];
  edges: Edge[];
  currentFilePath: string | null;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setCurrentFilePath: (path: string | null) => void;
  addPageNode: (props: AddNodeProps) => void;
  addChoiceNode: (props: AddNodeProps) => void;
  reset: () => void;
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
      setCurrentFilePath: (path: string | null) =>
        set({ currentFilePath: path }),
      reset: () =>
        set({
          nodes: initialNodes,
          edges: initialEdges,
          currentFilePath: null,
        }),
      addPageNode: ({ id, position }: AddNodeProps) =>
        set((state) => ({
          nodes: [
            ...state.nodes,
            {
              id: id || crypto.randomUUID(),
              type: "page",
              position: position || { x: 0, y: 0 },
              data: { type: "normal", title: "Nuova Pagina", content: "" },
              ...nodeDefaults,
            },
          ],
        })),
      addChoiceNode: ({ id, position }: AddNodeProps) =>
        set((state) => ({
          nodes: [
            ...state.nodes,
            {
              id: id || crypto.randomUUID(),
              type: "choice",
              position: position || { x: 0, y: 0 },
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
