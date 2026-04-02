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
  Phone, Video, X, Paperclip, Send, RotateCcw, Monitor,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
        style={{ color: showSimulator ? "#ef4444" : "#22c55e" }}
        onClick={onToggleSimulator}
      >
        {showSimulator ? <Square size={14} /> : <Play size={14} />}
      </button>
    </div>
  );
};

// Simulator Panel
type Message = {
  from: "lead" | "bot" | "system";
  text: string;
  time: string;
  imageUrl?: string;
  audioUrl?: string;
  buttons?: { label: string; value: string; handleId?: string }[];
};

const SimulatorPanel: React.FC<{ onClose: () => void; nodes: Node[]; edges: Edge[] }> = ({ onClose, nodes, edges }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState("");
  const [waitingFor, setWaitingFor] = useState<{ type: "wait" | "condition" | "payment"; nodeId: string } | null>(null);
  const [running, setRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);

  const now = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const getNextNode = useCallback((currentId: string, handleId?: string): Node | null => {
    const edge = edges.find(e => e.source === currentId && (handleId ? e.sourceHandle === handleId : true));
    if (!edge) return null;
    return nodes.find(n => n.id === edge.target) || null;
  }, [nodes, edges]);

  const addMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const processNodeAndContinue = useCallback(async (node: Node) => {
    if (abortRef.current) return;
    const data = node.data as any;
    const type = data.type || node.type;

    switch (type) {
      case "start": {
        const next = getNextNode(node.id);
        if (next) { await delay(300); await processNodeAndContinue(next); }
        else addMessage({ from: "system", text: "✅ Fluxo concluído!", time: now() });
        return;
      }
      case "text":
      case "textNode": {
        addMessage({ from: "bot", text: data.message || "[Mensagem não configurada]", time: now() });
        break;
      }
      case "delay": {
        const val = data.delayValue ?? 5;
        const unit = data.delayUnit || "seconds";
        const unitLabels: Record<string, string> = { seconds: "segundos", minutes: "minutos", hours: "horas" };
        addMessage({ from: "system", text: `⏱ Aguardando ${val} ${unitLabels[unit] || unit}...`, time: now() });
        const ms = Math.min(val * (unit === "seconds" ? 500 : 1000), 3000);
        await delay(ms);
        break;
      }
      case "image": {
        if (data.fileUrl) {
          addMessage({ from: "bot", text: "", time: now(), imageUrl: data.fileUrl });
        } else {
          addMessage({ from: "bot", text: "[Imagem não configurada]", time: now() });
        }
        break;
      }
      case "audio": {
        if (data.fileUrl) {
          addMessage({ from: "bot", text: "", time: now(), audioUrl: data.fileUrl });
        } else {
          addMessage({ from: "bot", text: "[Áudio não configurado]", time: now() });
        }
        break;
      }
      case "wait": {
        addMessage({ from: "system", text: "⏳ Aguardando sua resposta...", time: now() });
        const groups = data.responseGroups || [];
        const buttons: Message["buttons"] = [];
        groups.forEach((g: any) => {
          (g.keywords || []).forEach((kw: string) => {
            buttons.push({ label: kw, value: kw });
          });
        });
        buttons.push({ label: "Outra resposta", value: "__free__" });
        addMessage({ from: "system", text: "", time: now(), buttons });
        setWaitingFor({ type: "wait", nodeId: node.id });
        setRunning(false);
        return;
      }
      case "condition": {
        addMessage({ from: "system", text: `🔀 Condição: ${data.condValue || "[não configurada]"}`, time: now() });
        addMessage({
          from: "system", text: "", time: now(),
          buttons: [
            { label: "✓ Verdadeiro", value: "true", handleId: "true" },
            { label: "✗ Falso", value: "false", handleId: "false" },
          ],
        });
        setWaitingFor({ type: "condition", nodeId: node.id });
        setRunning(false);
        return;
      }
      case "payment": {
        addMessage({ from: "system", text: "💰 Aguardando confirmação de pagamento...", time: now() });
        addMessage({
          from: "system", text: "", time: now(),
          buttons: [
            { label: "✓ Simular Pagamento", value: "paid", handleId: "paid" },
            { label: "✗ Não pagou", value: "unpaid", handleId: "unpaid" },
          ],
        });
        setWaitingFor({ type: "payment", nodeId: node.id });
        setRunning(false);
        return;
      }
      case "ai-respond": {
        const prompt = data.prompt ? data.prompt.substring(0, 60) + "..." : "Resposta da IA";
        addMessage({ from: "bot", text: `[IA] ${prompt}`, time: now() });
        break;
      }
      case "pixel": {
        addMessage({ from: "system", text: `📊 Evento Pixel disparado: ${data.pixelEvent || "Lead"}`, time: now() });
        break;
      }
      case "pix": {
        addMessage({ from: "bot", text: `Chave PIX: ${data.pixKey || "[não configurada]"}\nTipo: ${data.pixType || "Telefone"}`, time: now() });
        break;
      }
      case "notify": {
        addMessage({ from: "system", text: `🔔 Admin notificado: ${data.adminPhone || ""}`, time: now() });
        break;
      }
      case "connect-flow": {
        addMessage({ from: "system", text: `🔗 Conectando ao fluxo: ${data.targetFlow || "[não configurado]"}`, time: now() });
        addMessage({ from: "system", text: "✅ Fluxo concluído!", time: now() });
        setRunning(false);
        return;
      }
      case "randomizer": {
        const paths = data.randomPaths || ["Caminho A", "Caminho B"];
        const idx = Math.floor(Math.random() * paths.length);
        addMessage({ from: "system", text: `🎲 Randomizador → ${paths[idx]}`, time: now() });
        await delay(800);
        const next = getNextNode(node.id, `path-${idx}`);
        if (next) { await processNodeAndContinue(next); }
        else addMessage({ from: "system", text: "✅ Fluxo concluído!", time: now() });
        setRunning(false);
        return;
      }
      case "sticker": {
        if (data.stickerUrl) {
          addMessage({ from: "bot", text: "", time: now(), imageUrl: data.stickerUrl });
        } else {
          addMessage({ from: "bot", text: "[Figurinha não configurada]", time: now() });
        }
        break;
      }
      case "wa-tag":
      case "tags": {
        const action = data.tagAction === "remove" ? "Removida" : "Adicionada";
        addMessage({ from: "system", text: `🏷 Etiqueta ${action}: ${data.tagName || "[sem nome]"}`, time: now() });
        break;
      }
      case "passage-id": {
        addMessage({ from: "system", text: `🔖 Identificador: ${data.passageLabel || "[não configurado]"}`, time: now() });
        break;
      }
      case "ai-text": {
        addMessage({ from: "bot", text: `[IA Texto] ${data.prompt ? data.prompt.substring(0, 60) + "..." : "Texto gerado por IA"}`, time: now() });
        break;
      }
      case "video": {
        addMessage({ from: "bot", text: `🎬 ${data.fileName || "[Vídeo não configurado]"}`, time: now() });
        break;
      }
      case "document": {
        addMessage({ from: "bot", text: `📄 ${data.fileName || "[Documento não configurado]"}`, time: now() });
        break;
      }
      default: {
        addMessage({ from: "system", text: `⚙️ Nó: ${data.label || type}`, time: now() });
        break;
      }
    }

    // Continue to next node
    await delay(800);
    if (abortRef.current) return;
    const next = getNextNode(node.id);
    if (next) {
      await processNodeAndContinue(next);
    } else {
      addMessage({ from: "system", text: "✅ Fluxo concluído!", time: now() });
      setRunning(false);
    }
  }, [getNextNode, addMessage]);

  const continueFromWait = useCallback(async (handleId?: string) => {
    if (!waitingFor) return;
    const next = getNextNode(waitingFor.nodeId, handleId);
    setWaitingFor(null);
    setRunning(true);
    if (next) {
      await delay(800);
      await processNodeAndContinue(next);
    } else {
      addMessage({ from: "system", text: "✅ Fluxo concluído!", time: now() });
      setRunning(false);
    }
  }, [waitingFor, getNextNode, processNodeAndContinue, addMessage]);

  const startTest = useCallback(async () => {
    abortRef.current = false;
    setMessages([]);
    setWaitingFor(null);
    setStarted(true);
    setRunning(true);
    const startNode = nodes.find(n => n.type === "start" || (n.data as any).type === "start");
    if (!startNode) {
      setMessages([{ from: "system", text: "❌ Nó de início não encontrado!", time: now() }]);
      setRunning(false);
      return;
    }
    await delay(500);
    await processNodeAndContinue(startNode);
  }, [nodes, processNodeAndContinue]);

  const resetSimulator = useCallback(() => {
    abortRef.current = true;
    setMessages([]);
    setStarted(false);
    setRunning(false);
    setWaitingFor(null);
    setInput("");
  }, []);

  const handleButtonClick = useCallback((btn: { label: string; value: string; handleId?: string }) => {
    if (!waitingFor) return;
    if (btn.value === "__free__") {
      // Focus input for free text
      return;
    }
    addMessage({ from: "lead", text: btn.label, time: now() });
    continueFromWait(btn.handleId);
  }, [waitingFor, addMessage, continueFromWait]);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    addMessage({ from: "lead", text, time: now() });
    if (waitingFor?.type === "wait") {
      continueFromWait();
    }
  }, [input, waitingFor, addMessage, continueFromWait]);

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
        <button className="text-muted-foreground hover:text-foreground p-1" onClick={resetSimulator}><RotateCcw size={14} /></button>
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
          messages.map((m, i) => {
            if (m.from === "system") {
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  {m.text && (
                    <div style={{
                      background: "#1a1a1a", borderRadius: 6, padding: "4px 10px",
                      fontSize: 12, color: "#9ca3af", fontStyle: "italic", textAlign: "center",
                      maxWidth: "90%", whiteSpace: "pre-wrap",
                    }}>
                      {m.text}
                    </div>
                  )}
                  {m.buttons && m.buttons.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", marginTop: 2 }}>
                      {m.buttons.map((btn, bi) => (
                        <button
                          key={bi}
                          onClick={() => handleButtonClick(btn)}
                          disabled={!waitingFor}
                          style={{
                            background: waitingFor ? "#2a2a2a" : "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: 16, padding: "4px 10px",
                            fontSize: 12, color: waitingFor ? "#fff" : "#666",
                            cursor: waitingFor ? "pointer" : "default",
                          }}
                          onMouseEnter={e => { if (waitingFor) (e.target as HTMLButtonElement).style.background = "#333"; }}
                          onMouseLeave={e => { if (waitingFor) (e.target as HTMLButtonElement).style.background = "#2a2a2a"; }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "lead" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: m.imageUrl ? 4 : "8px 12px", fontSize: 13, color: "#fff",
                  background: m.from === "lead" ? "#005c4b" : "#1f2c34",
                  borderRadius: m.from === "lead" ? "8px 0 8px 8px" : "0 8px 8px 8px",
                  overflow: "hidden",
                }}>
                  {m.imageUrl ? (
                    <img src={m.imageUrl} alt="" style={{ maxWidth: "100%", borderRadius: 4, display: "block" }} />
                  ) : m.audioUrl ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const audio = document.getElementById(`sim-audio-${i}`) as HTMLAudioElement;
                          if (audio) audio.paused ? audio.play() : audio.pause();
                        }}
                        style={{ width: 28, height: 28, borderRadius: "50%", background: "#22c55e", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                      </button>
                      <div style={{ flex: 1, height: 4, background: "#2a2a2a", borderRadius: 2 }} />
                      <audio id={`sim-audio-${i}`} src={m.audioUrl} style={{ display: "none" }} />
                    </div>
                  ) : (
                    <span style={{ whiteSpace: "pre-wrap" }}>{m.text}</span>
                  )}
                </div>
                <span style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{m.time}</span>
              </div>
            );
          })
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
        {showSimulator && <SimulatorPanel onClose={() => setShowSimulator(false)} nodes={nodes} edges={edges} />}
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
