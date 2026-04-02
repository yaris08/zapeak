import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
  BackgroundVariant,
} from "reactflow";
import "reactflow/dist/style.css";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Plus, Minus, Maximize2, Expand, Play, Square,
  Phone, Video, X, Paperclip, Send,
} from "lucide-react";

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

// Custom Controls inside ReactFlow context
const CustomControls: React.FC<{ showSimulator: boolean; onToggleSimulator: () => void }> = ({
  showSimulator, onToggleSimulator,
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const btnClass = "w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-[#2a2a2a] hover:text-foreground transition-colors";

  return (
    <div style={{
      position: "absolute", bottom: 16, left: 16, zIndex: 10,
      display: "flex", flexDirection: "column", gap: 4,
      background: "#1a1a1a", border: "1px solid #2a2a2a",
      borderRadius: 10, padding: 6,
    }}>
      <button className={btnClass} onClick={() => zoomIn()}><Plus size={14} /></button>
      <button className={btnClass} onClick={() => zoomOut()}><Minus size={14} /></button>
      <div style={{ height: 1, background: "#2a2a2a", margin: "2px 0" }} />
      <button className={btnClass} onClick={() => fitView()}><Maximize2 size={14} /></button>
      <button className={btnClass} onClick={() => {
        const el = document.documentElement;
        if (!document.fullscreenElement) el.requestFullscreen?.();
        else document.exitFullscreen?.();
      }}><Expand size={14} /></button>
      <div style={{ height: 1, background: "#2a2a2a", margin: "2px 0" }} />
      <button
        className="w-8 h-8 rounded-md flex items-center justify-center transition-colors"
        style={{ color: showSimulator ? "#ef4444" : "#f97316" }}
        onClick={onToggleSimulator}
      >
        {showSimulator ? <Square size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
};

// Simulator Panel
type Message = { from: "lead" | "bot"; text: string; time: string };

const SimulatorPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const now = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const startTest = () => {
    setStarted(true);
    const t = now();
    setMessages([{ from: "lead", text: "Oi", time: t }]);
    setTimeout(() => setMessages(prev => [...prev, { from: "bot", text: "Olá! Bem-vindo ao simulador 👋", time: now() }]), 1500);
    setTimeout(() => setMessages(prev => [...prev, { from: "bot", text: "Este é um preview do seu fluxo.", time: now() }]), 2500);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMessages(prev => [...prev, { from: "lead", text, time: now() }]);
    setTimeout(() => setMessages(prev => [...prev, { from: "bot", text: "Mensagem recebida ✓", time: now() }]), 1000);
  };

  return (
    <div style={{
      width: 320, minWidth: 320, height: "100%",
      background: "#0f0f0f", borderLeft: "1px solid #2a2a2a",
      display: "flex", flexDirection: "column",
    }}>
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 16px", fontSize: 11, color: "#6b7280" }}>
        <span>09:41</span>
        <div style={{ display: "flex", gap: 6 }}>
          <span>●●●●</span>
          <span>WiFi</span>
          <span>100%</span>
        </div>
      </div>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
        background: "#1a1a1a", borderBottom: "1px solid #2a2a2a",
      }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>S</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Simulador</div>
          <div style={{ fontSize: 11, color: "#22c55e" }}>online</div>
        </div>
        <button className="text-muted-foreground hover:text-foreground p-1"><Phone size={16} /></button>
        <button className="text-muted-foreground hover:text-foreground p-1"><Video size={16} /></button>
        <button className="text-muted-foreground hover:text-foreground p-1" onClick={onClose}><X size={16} /></button>
      </div>
      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {!started ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <p style={{ fontSize: 12, color: "#6b7280", textAlign: "center", lineHeight: 1.5 }}>
              Simulador de Fluxo — Teste seu fluxo como se fosse um lead real
            </p>
            <button
              onClick={startTest}
              style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
            >
              ▶ Iniciar Teste
            </button>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "lead" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "8px 12px", fontSize: 13, color: "#fff",
                background: m.from === "lead" ? "#005c4b" : "#1f2c34",
                borderRadius: m.from === "lead" ? "8px 0 8px 8px" : "0 8px 8px 8px",
              }}>
                {m.text}
              </div>
              <span style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{m.time}</span>
            </div>
          ))
        )}
      </div>
      {/* Input */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#1f2c34", borderTop: "1px solid #2a2a2a" }}>
        <button className="text-muted-foreground hover:text-foreground"><Paperclip size={16} /></button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Digite uma mensagem..."
          style={{ flex: 1, background: "#0f0f0f", border: "1px solid #2a2a2a", borderRadius: 20, padding: "6px 12px", fontSize: 13, color: "#fff", outline: "none" }}
        />
        <button className="text-muted-foreground hover:text-foreground" onClick={sendMessage}><Send size={16} /></button>
      </div>
    </div>
  );
};

const FlowEditorInner: React.FC = () => {
  const { id: flowId } = useParams<{ id: string }>();
  const storageKey = `zapeak_flow_${flowId || "default"}`;

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [flowName, setFlowName] = useState("Meu primeiro fluxo");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const initialized = useRef(false);

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
      }
    } catch {}
  }, [storageKey, setNodes, setEdges]);

  const markDirty = useCallback(() => setHasUnsavedChanges(true), []);

  useEffect(() => {
    if (!hasUnsavedChanges || !initialized.current) return;
    const timer = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify({ nodes, edges, flowName }));
      setHasUnsavedChanges(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [hasUnsavedChanges, nodes, edges, flowName, storageKey]);

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId) || null, [nodes, selectedNodeId]);

  const nodeTypes = useMemo(() => ({ start: StartNode, textNode: TextNode, generic: GenericNode }), []);
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
      setEdges((eds) => addEdge({ ...params, type: "custom", animated: false, style: { stroke: "#22c55e" } }, eds));
      markDirty();
    },
    [setEdges, markDirty]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => { setSelectedNodeId(node.id); setSelectedEdgeId(null); }, []);
  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => { setSelectedEdgeId(edge.id); setSelectedNodeId(null); }, []);
  const onPaneClick = useCallback(() => { setSelectedNodeId(null); setSelectedEdgeId(null); }, []);
  const onDragOver = useCallback((event: React.DragEvent) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow-type");
      const name = event.dataTransfer.getData("application/reactflow-name");
      const color = event.dataTransfer.getData("application/reactflow-color");
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
      setNodes((nds) => nds.concat({ id: `node_${Date.now()}`, type: "generic", position, data: { label: name, type, color } }));
      markDirty();
    },
    [reactFlowInstance, setNodes, markDirty]
  );

  const handleDeleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedNodeId(null);
    markDirty();
  }, [setNodes, setEdges, markDirty]);

  const handleDuplicateNode = useCallback((node: Node) => {
    setNodes((nds) => nds.concat({ ...node, id: `node_${Date.now()}`, position: { x: node.position.x + 180, y: node.position.y + 80 }, data: { ...node.data } }));
    markDirty();
  }, [setNodes, markDirty]);

  const handleUpdateNode = useCallback((id: string, newData: any) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...newData } } : n)));
    markDirty();
  }, [setNodes, markDirty]);

  const handleNameChange = useCallback((name: string) => { setFlowName(name); setHasUnsavedChanges(true); }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <EditorHeader
        flowName={flowName}
        onNameChange={handleNameChange}
        instanceName="Principal"
        instanceStatus="active"
      />
      <div className="flex flex-1 overflow-hidden">
        <ComponentsSidebar />
        <div className="flex-1 relative" ref={reactFlowWrapper} style={{ backgroundColor: "#0a0a0a" }}>
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
            <Background variant={BackgroundVariant.Lines} gap={40} lineWidth={0.3} color="#1e1e1e" />
            <MiniMap
              className="!bg-card !border !border-border !rounded-lg"
              nodeColor="#22c55e"
              maskColor="rgba(0,0,0,0.7)"
            />
            <CustomControls showSimulator={showSimulator} onToggleSimulator={() => setShowSimulator(v => !v)} />
          </ReactFlow>
        </div>
        {showSimulator && <SimulatorPanel onClose={() => setShowSimulator(false)} />}
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

const FlowEditor: React.FC = () => (
  <ReactFlowProvider>
    <FlowEditorInner />
  </ReactFlowProvider>
);

export default FlowEditor;
