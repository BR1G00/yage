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
  type Node as ReactFlowNode,
  type OnSelectionChangeParams,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { ChoiceNode, PageNode } from "./index";
import ToolBar from "./ToolBar";
import useGamebookStore from "@/lib/stores/gamebook.store";

const nodeTypes = {
  page: PageNode,
  choice: ChoiceNode,
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

  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams<ReactFlowNode, Edge>) => {
      console.log("Selected nodes:", params.nodes);
      console.log("Selected edges:", params.edges);
    },
    []
  );

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
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        multiSelectionKeyCode={null}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onSelectionChange={onSelectionChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        isValidConnection={isValidConnection}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-left" className="w-screen bg-red-500 !m-0">
          <ToolBar />
        </Panel>
      </ReactFlow>
    </div>
  );
};
