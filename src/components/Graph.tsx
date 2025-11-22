import useGamebookStore from "@/lib/stores/gamebook.store";
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
  type OnConnectEnd,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useRef } from "react";
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

const GraphInner = () => {
  const nodes = useGamebookStore((state) => state.nodes);
  const edges = useGamebookStore((state) => state.edges);
  const setNodes = useGamebookStore((state) => state.setNodes);
  const setEdges = useGamebookStore((state) => state.setEdges);
  const addPageNode = useGamebookStore((state) => state.addPageNode);
  const addChoiceNode = useGamebookStore((state) => state.addChoiceNode);
  const { screenToFlowPosition, getViewport, setCenter } = useReactFlow();
  const mouseUpRef = useRef(false);
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

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        const id = crypto.randomUUID();
        const { clientX, clientY } =
          "changedTouches" in event ? event.changedTouches[0] : event;

        if (connectionState.fromNode?.type === "page") {
          addChoiceNode({
            id,
            position: screenToFlowPosition({
              x: clientX,
              y: clientY,
            }),
          });
        } else {
          addPageNode({
            id,
            position: screenToFlowPosition({
              x: clientX,
              y: clientY,
            }),
          });
        }

        setEdges([
          ...edges,
          { id, source: connectionState.fromNode?.id || "", target: id },
        ]);
      }
    },
    [addPageNode, screenToFlowPosition, addChoiceNode, edges, setEdges]
  );

  const selectedNodeId = useMemo(
    () => nodes.find((node) => node.selected)?.id,
    [nodes]
  );

  function centerToNode(nodeId: string) {
    const node = nodes.find((node) => node.id === nodeId);
    if (node) {
      const { zoom } = getViewport();
      setCenter(node.position.x + 416, node.position.y + 200, {
        duration: 800,
        zoom,
      });
    }
  }

  useEffect(() => {
    if (selectedNodeId && mouseUpRef.current) {
      centerToNode(selectedNodeId);
    }
  }, [selectedNodeId, mouseUpRef.current]);

  return (
    <ReactFlow
      deleteKeyCode={null}
      multiSelectionKeyCode={null}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectEnd={onConnectEnd}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      isValidConnection={isValidConnection}
      onMouseDownCapture={() => {
        mouseUpRef.current = false;
      }}
      onClick={() => {
        mouseUpRef.current = true;
      }}
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

export const Graph = () => {
  return (
    <ReactFlowProvider>
      <GraphInner />
    </ReactFlowProvider>
  );
};
