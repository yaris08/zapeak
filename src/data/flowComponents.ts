import { MessageSquare, Sparkles, Image, Mic, Video, FileText, Smile, Clock, MessageCircle, Bot, GitBranch, Shuffle, Zap, ScanLine, Tag, CreditCard, QrCode, Bell, ArrowRightLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ComponentItem {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  section: string;
  type: string;
}

export const componentItems: ComponentItem[] = [
  // MENSAGENS
  { id: "texto", name: "Texto", icon: MessageSquare, color: "#3b82f6", section: "MENSAGENS", type: "text" },
  { id: "texto-ia", name: "Texto com IA", icon: Sparkles, color: "#a855f7", section: "MENSAGENS", type: "ai-text" },
  { id: "imagem", name: "Imagem", icon: Image, color: "#a855f7", section: "MENSAGENS", type: "image" },
  { id: "audio", name: "Áudio", icon: Mic, color: "#f97316", section: "MENSAGENS", type: "audio" },
  { id: "video", name: "Vídeo", icon: Video, color: "#ef4444", section: "MENSAGENS", type: "video" },
  { id: "documento", name: "Documento", icon: FileText, color: "#ef4444", section: "MENSAGENS", type: "document" },
  { id: "figurinha", name: "Figurinha", icon: Smile, color: "#22c55e", section: "MENSAGENS", type: "sticker" },
  
  // CONTROLE
  { id: "delay", name: "Delay", icon: Clock, color: "#eab308", section: "CONTROLE", type: "delay" },
  { id: "aguardar", name: "Aguardar Resposta", icon: MessageCircle, color: "#06b6d4", section: "CONTROLE", type: "wait" },
  { id: "ia-responder", name: "IA Responder", icon: Bot, color: "#a855f7", section: "CONTROLE", type: "ai-respond" },
  { id: "condicao", name: "Condição", icon: GitBranch, color: "#ef4444", section: "CONTROLE", type: "condition" },
  { id: "randomizador", name: "Randomizador", icon: Shuffle, color: "#3b82f6", section: "CONTROLE", type: "randomizer" },
  { id: "pixel", name: "Pixel", icon: Zap, color: "#06b6d4", section: "CONTROLE", type: "pixel" },
  { id: "identificador", name: "Id. Passagem", icon: ScanLine, color: "#06b6d4", section: "CONTROLE", type: "passage-id" },
  // AÇÕES
  { id: "etiquetas", name: "Etiquetas", icon: Tag, color: "#f97316", section: "AÇÕES", type: "tags" },
  { id: "pagamento", name: "Id. Pagamento", icon: CreditCard, color: "#22c55e", section: "AÇÕES", type: "payment" },
  { id: "pix", name: "Enviar Chave PIX", icon: QrCode, color: "#22c55e", section: "AÇÕES", type: "pix" },
  { id: "notificar", name: "Notificar Admin", icon: Bell, color: "#ef4444", section: "AÇÕES", type: "notify" },
  { id: "conectar-fluxo", name: "Conectar Fluxo", icon: ArrowRightLeft, color: "#3b82f6", section: "AÇÕES", type: "connect-flow" },
  { id: "etiqueta-wa", name: "Etiqueta WhatsApp", icon: Tag, color: "#22c55e", section: "AÇÕES", type: "wa-tag" },
];
