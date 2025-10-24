import useGamebookStore from "@/lib/stores/gamebook.store";
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import CustomEdge from "./CustomEdge";
import { ChoiceNode, PageNode } from "./index";
import ToolBar from "./ToolBar";

const nodeTypes = {
  page: PageNode,
  choice: ChoiceNode,
};

const edgeTypes = {
  default: CustomEdge,
};

export const Graph = () => {
  const nodes = useGamebookStore((state) => state.nodes);
  const edges = useGamebookStore((state) => state.edges);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const setEdges = useGamebookStore((state) => state.setEdges);

  const isValidConnection = (connection: Connection | Edge) => {
    const sourceNode = nodes.find((node) => node.id === connection.source);
    const targetNode = nodes.find((node) => node.id === connection.target);
    return sourceNode?.type !== targetNode?.type;
  };

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges(
        addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, edges)
      );
    },
    [edges, setEdges]
  );

  return (
    <ReactFlow
      multiSelectionKeyCode={null}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      isValidConnection={isValidConnection}
    >
      <Background />
      <Controls />
      <MiniMap />
      <Panel position="top-left" className="w-screen !m-0">
        <ToolBar />
      </Panel>
    </ReactFlow>
  );
};
