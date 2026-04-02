import React, { useState, useCallback, useRef, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";

import EditorHeader from "@/components/flow/EditorHeader";
import ComponentsSidebar from "@/components/flow/ComponentsSidebar";
import PropertiesPanel from "@/components/flow/PropertiesPanel";
import StartNode from "@/components/flow/nodes/StartNode";
import TextNode from "@/components/flow/nodes/TextNode";
import GenericNode from "@/components/flow/nodes/GenericNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    position: { x: 100, y: 200 },
    data: { label: "Iniciar", triggerType: "keyword", matchType: "contains", keywords: [] },
  },
  {
    id: "2",
    type: "textNode",
    position: { x: 450, y: 200 },
    data: { label: "Texto", message: "" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#f97316", strokeDasharray: "5 5" },
  },
];

let nodeId = 3;

const FlowEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [flowName, setFlowName] = useState("Meu primeiro fluxo");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId) || null, [nodes, selectedNodeId]);

  const nodeTypes = useMemo(
    () => ({
      start: StartNode,
      textNode: TextNode,
      generic: GenericNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#f97316", strokeDasharray: "5 5" } },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow-type");
      const name = event.dataTransfer.getData("application/reactflow-name");
      const color = event.dataTransfer.getData("application/reactflow-color");

      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode: Node = {
        id: String(nodeId++),
        type: "generic",
        position,
        data: { label: name, type, color },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const handleDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
      setSelectedNodeId(null);
    },
    [setNodes, setEdges]
  );

  const handleDuplicateNode = useCallback(
    (node: Node) => {
      const newNode: Node = {
        ...node,
        id: String(nodeId++),
        position: { x: node.position.x + 50, y: node.position.y + 50 },
        data: { ...node.data },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const handleUpdateNode = useCallback(
    (id: string, newData: any) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...newData } } : n))
      );
    },
    [setNodes]
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      <EditorHeader flowName={flowName} onNameChange={setFlowName} />
      <div className="flex flex-1 overflow-hidden">
        <ComponentsSidebar />
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(var(--canvas-dots))" />
            <Controls className="!bg-card !border-border !rounded-lg [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-accent" />
            <MiniMap
              className="!bg-card !border !border-border !rounded-lg"
              nodeColor="#f97316"
              maskColor="rgba(0,0,0,0.7)"
            />
          </ReactFlow>
        </div>
        <PropertiesPanel
          node={selectedNode}
          onClose={() => setSelectedNodeId(null)}
          onDelete={handleDeleteNode}
          onDuplicate={handleDuplicateNode}
          onUpdateNode={handleUpdateNode}
        />
      </div>
    </div>
  );
};

export default FlowEditor;
