import { MarkerType, Position, type Edge, type Node } from "@xyflow/react";
import { create } from "zustand";

interface GamebookStore {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
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
      content: "Starting Page!!!!!",
    },
    type: "page",
    ...nodeDefaults,
  },
  {
    id: "n2",
    position: { x: 400, y: 400 },
    data: {
      title: "Choice 1",
      content: "This is the content of choice 1",
    },
    type: "choice",
    ...nodeDefaults,
  },
  {
    id: "n3",
    position: { x: 400, y: 800 },
    data: { title: "Choice 2", content: "This is the content of choice 2" },
    type: "choice",
    ...nodeDefaults,
  },
  {
    id: "n4",
    position: { x: 800, y: 400 },
    data: { type: "end", title: "Page 2", content: "Game Over" },
    type: "page",
    ...nodeDefaults,
  },
  {
    id: "n5",
    position: { x: 800, y: 800 },
    data: {
      type: "normal",
      title: "Page 3",
      content: "This is the content of page 3",
    },
    type: "page",
    ...nodeDefaults,
  },
];

const initialEdges: Edge[] = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
  {
    id: "n2-n4",
    source: "n2",
    target: "n4",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  },
];

const useGamebookStore = create<GamebookStore>((set) => ({
  nodes: initialNodes,
  edges: initialEdges,
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),
}));

export default useGamebookStore;
