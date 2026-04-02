import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import EditorHeader from "@/components/flow/EditorHeader";
import ComponentsSidebar from "@/components/flow/ComponentsSidebar";
import PropertiesPanel from "@/components/flow/PropertiesPanel";
import StartNode from "@/components/flow/nodes/StartNode";
import TextNode from "@/components/flow/nodes/TextNode";
import GenericNode from "@/components/flow/nodes/GenericNode";
import CustomEdge from "@/components/flow/edges/CustomEdge";

const defaultNodes: Node[] = [
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

const defaultEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "custom",
    animated: false,
    style: { stroke: "#22c55e" },
  },
];

const FlowEditor: React.FC = () => {
  const { id: flowId } = useParams<{ id: string }>();
  const storageKey = `flowzap_flow_${flowId || "default"}`;

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [flowName, setFlowName] = useState("Meu primeiro fluxo");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const initialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.nodes) setNodes(parsed.nodes);
        if (parsed.edges) setEdges(parsed.edges);
        if (parsed.flowName) setFlowName(parsed.flowName);
        // IDs now use timestamps, no counter needed
      }
    } catch {}
  }, [storageKey, setNodes, setEdges]);

  const handleSave = useCallback(() => {
    localStorage.setItem(storageKey, JSON.stringify({ nodes, edges, flowName }));
    setHasUnsavedChanges(false);
    toast.success("✓ Fluxo salvo com sucesso");
  }, [storageKey, nodes, edges, flowName]);

  const markDirty = useCallback(() => setHasUnsavedChanges(true), []);

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId) || null, [nodes, selectedNodeId]);

  const nodeTypes = useMemo(
    () => ({
      start: StartNode,
      textNode: TextNode,
      generic: GenericNode,
    }),
    []
  );

  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const wrappedOnNodesChange: typeof onNodesChange = useCallback(
    (changes) => { onNodesChange(changes); markDirty(); },
    [onNodesChange, markDirty]
  );

  const wrappedOnEdgesChange: typeof onEdgesChange = useCallback(
    (changes) => { onEdgesChange(changes); markDirty(); },
    [onEdgesChange, markDirty]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          { ...params, type: "custom", animated: false, style: { stroke: "#22c55e" } },
          eds
        )
      );
      markDirty();
    },
    [setEdges, markDirty]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);
  }, []);

  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdgeId(edge.id);
    setSelectedNodeId(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
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
        id: `node_${Date.now()}`,
        type: "generic",
        position,
        data: { label: name, type, color },
      };

      setNodes((nds) => nds.concat(newNode));
      markDirty();
    },
    [reactFlowInstance, setNodes, markDirty]
  );

  const handleDeleteNode = useCallback(
    (id: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
      setSelectedNodeId(null);
      markDirty();
    },
    [setNodes, setEdges, markDirty]
  );

  const handleDuplicateNode = useCallback(
    (node: Node) => {
      const newNode: Node = {
        ...node,
        id: `node_${Date.now()}`,
        position: { x: node.position.x + 180, y: node.position.y + 80 },
        data: { ...node.data },
      };
      setNodes((nds) => nds.concat(newNode));
      markDirty();
    },
    [setNodes, markDirty]
  );

  const handleUpdateNode = useCallback(
    (id: string, newData: any) => {
      setNodes((nds) =>
        nds.map((n) => (n.id === id ? { ...n, data: { ...newData } } : n))
      );
      markDirty();
    },
    [setNodes, markDirty]
  );

  const handleNameChange = useCallback((name: string) => {
    setFlowName(name);
    setHasUnsavedChanges(true);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <EditorHeader
        flowName={flowName}
        onNameChange={handleNameChange}
        onSave={handleSave}
        hasUnsavedChanges={hasUnsavedChanges}
      />
      <div className="flex flex-1 overflow-hidden">
        <ComponentsSidebar />
        <div className="flex-1" ref={reactFlowWrapper} style={{ backgroundColor: "#0a0a0a" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={wrappedOnNodesChange}
            onEdgesChange={wrappedOnEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={0.8} color="#1a1a1a" />
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
