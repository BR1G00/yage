import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { ChoiceNode, PageNode } from "./index";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const nodeTypes = {
  page: PageNode,
  choice: ChoiceNode,
};

const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 600 },
    data: { title: "Page 1", content: "This is the content of page 1" },
    type: "page",
    ...nodeDefaults,
  },
  {
    id: "n2",
    position: { x: 400, y: 400 },
    data: { title: "Choice 1", content: "This is the content of choice 1" },
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
    data: { title: "Page 2", content: "This is the content of page 2" },
    type: "page",
    ...nodeDefaults,
  },
  {
    id: "n5",
    position: { x: 800, y: 800 },
    data: { title: "Page 3", content: "This is the content of page 3" },
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
];

export const Graph = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
  }, []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
  }, []);
  const onConnect = useCallback((params: Connection) => {
    setEdges((edgesSnapshot) =>
      addEdge(
        { ...params, markerEnd: { type: MarkerType.Arrow } },
        edgesSnapshot
      )
    );
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
