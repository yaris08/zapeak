import React, { useState, useEffect } from "react";
import { Loader2, Check, Eye, EyeOff, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type Tab = "pixel" | "ia" | "notificacoes";

const tabs: { id: Tab; label: string }[] = [
  { id: "pixel", label: "Facebook Pixel" },
  { id: "ia", label: "IA" },
  { id: "notificacoes", label: "Notificações" },
];

function loadSettings(tab: string) {
  try {
    const raw = localStorage.getItem(`zapeak_settings_${tab}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

const detectProvider = (key: string): string | null => {
  if (key.startsWith("sk-ant")) return "anthropic";
  if (key.startsWith("sk-")) return "openai";
  if (key.startsWith("AIza")) return "gemini";
  if (key.length > 0) return "unknown";
  return null;
};

const modelsByProvider: Record<string, { value: string; label: string }[]> = {
  anthropic: [
    { value: "claude-sonnet-4.5", label: "Claude Sonnet 4.5 (Recomendado)" },
    { value: "claude-haiku-4.5", label: "Claude Haiku 4.5 (Rápido)" },
  ],
  openai: [
    { value: "gpt-4o", label: "GPT-4o (Recomendado)" },
    { value: "gpt-4o-mini", label: "GPT-4o Mini (Rápido)" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  ],
  gemini: [
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro (Recomendado)" },
    { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash (Rápido)" },
  ],
};

const providerBadges: Record<string, { emoji: string; label: string }> = {
  anthropic: { emoji: "🟣", label: "Anthropic detectado" },
  openai: { emoji: "🟢", label: "OpenAI detectado" },
  gemini: { emoji: "🔵", label: "Google Gemini detectado" },
  unknown: { emoji: "⚪", label: "Provedor não reconhecido" },
};

const ConfiguracoesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("pixel");

  // Pixel
  const [pixelId, setPixelId] = useState("");
  const [pixelToken, setPixelToken] = useState("");
  const [pixelDataset, setPixelDataset] = useState("");
  const [showPixelToken, setShowPixelToken] = useState(false);
  const [pixelServerSide, setPixelServerSide] = useState(true);
  const [pixelTestStatus, setPixelTestStatus] = useState<null | "loading" | "success">(null);
  const [pixelSaved, setPixelSaved] = useState(false);

  // IA
  const [iaApiKey, setIaApiKey] = useState("");
  const [showIaKey, setShowIaKey] = useState(false);
  const [iaSaved, setIaSaved] = useState(false);
  const [iaModel, setIaModel] = useState("");

  // Notificações
  const [notifVenda, setNotifVenda] = useState(true);
  const [notifConversa, setNotifConversa] = useState(true);
  const [notifPixel, setNotifPixel] = useState(true);
  const [notifTimeout, setNotifTimeout] = useState(true);
  const [notifPhone, setNotifPhone] = useState("");

  const detectedProvider = detectProvider(iaApiKey);
  const lastProvider = React.useRef<string | null>(null);

  // Reset model when provider changes
  useEffect(() => {
    if (detectedProvider && detectedProvider !== "unknown" && detectedProvider !== lastProvider.current) {
      const models = modelsByProvider[detectedProvider];
      if (models) setIaModel(models[0].value);
    }
    lastProvider.current = detectedProvider;
  }, [detectedProvider]);

  useEffect(() => {
    const px = loadSettings("pixel");
    if (px) {
      setPixelId(px.pixelId || "");
      setPixelDataset(px.pixelDataset || "");
      setPixelServerSide(px.serverSide ?? true);
      if (px.pixelToken) setPixelSaved(true);
    }
    const ia = loadSettings("ia");
    if (ia) {
      setIaModel(ia.model || "");
      if (ia.apiKey) setIaSaved(true);
    }
    const nt = loadSettings("notificacoes");
    if (nt) {
      setNotifVenda(nt.venda ?? true);
      setNotifConversa(nt.conversa ?? true);
      setNotifPixel(nt.pixel ?? true);
      setNotifTimeout(nt.timeout ?? true);
      setNotifPhone(nt.phone || "");
    }
  }, []);

  const maskedPixelId = pixelSaved && !pixelId && loadSettings("pixel")?.pixelId
    ? loadSettings("pixel").pixelId.replace(/^(.{4}).*(.{2})$/, "$1•••••••••$2")
    : "";

  const handleSave = () => {
    if (activeTab === "pixel") {
      const prev = loadSettings("pixel") || {};
      localStorage.setItem("zapeak_settings_pixel", JSON.stringify({
        pixelId: pixelId || prev.pixelId || "",
        pixelToken: pixelToken || prev.pixelToken || "",
        pixelDataset: pixelDataset || prev.pixelDataset || "",
        serverSide: pixelServerSide,
      }));
      if (pixelId || pixelToken) setPixelSaved(true);
      setPixelToken("");
    }
    if (activeTab === "ia") {
      const prev = loadSettings("ia") || {};
      localStorage.setItem("zapeak_settings_ia", JSON.stringify({
        apiKey: iaApiKey || prev.apiKey || "",
        model: iaModel,
        provider: detectedProvider || prev.provider || "",
      }));
      if (iaApiKey) setIaSaved(true);
      setIaApiKey("");
    }
    if (activeTab === "notificacoes") {
      localStorage.setItem("zapeak_settings_notificacoes", JSON.stringify({
        venda: notifVenda,
        conversa: notifConversa,
        pixel: notifPixel,
        timeout: notifTimeout,
        phone: notifPhone,
      }));
    }
    toast.success("✓ Configurações salvas");
  };

  const handleTestPixel = () => {
    setPixelTestStatus("loading");
    setTimeout(() => setPixelTestStatus("success"), 1500);
  };

  const currentModels = detectedProvider && detectedProvider !== "unknown" ? modelsByProvider[detectedProvider] : null;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Configurações</h2>
        <p className="text-sm text-muted-foreground">Gerencie suas integrações</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[#2a2a2a]">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm transition-colors relative ${
              activeTab === t.id
                ? "text-[#22c55e] font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {activeTab === t.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#22c55e]" />
            )}
          </button>
        ))}
      </div>

      {/* Facebook Pixel */}
      {activeTab === "pixel" && (
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Pixel ID</Label>
              <Input
                value={pixelId}
                onChange={e => setPixelId(e.target.value)}
                placeholder={maskedPixelId || "123456789012345"}
                className="bg-[#0f0f0f] border-[#2a2a2a]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Token de Acesso (Conversions API)</Label>
              <div className="relative">
                <Input
                  type={showPixelToken ? "text" : "password"}
                  value={pixelToken}
                  onChange={e => setPixelToken(e.target.value)}
                  placeholder={pixelSaved ? "Token salvo — insira novo para alterar" : "Insira seu token de acesso"}
                  className="bg-[#0f0f0f] border-[#2a2a2a] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPixelToken(!showPixelToken)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPixelToken ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Dataset ID (opcional)</Label>
              <Input
                value={pixelDataset}
                onChange={e => setPixelDataset(e.target.value)}
                placeholder="dataset_id"
                className="bg-[#0f0f0f] border-[#2a2a2a]"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-foreground">Ativar envio server-side</Label>
              <Switch checked={pixelServerSide} onCheckedChange={setPixelServerSide} />
            </div>

            <button onClick={handleTestPixel} disabled={pixelTestStatus === "loading"} className="w-full py-2 border border-[#2a2a2a] rounded-lg text-sm text-foreground hover:bg-[#222] transition-colors flex items-center justify-center gap-2">
              {pixelTestStatus === "loading" ? <><Loader2 size={14} className="animate-spin" /> Testando...</> : "Testar Conexão"}
            </button>

            {pixelTestStatus === "success" && (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <Check size={14} /> ✓ Conexão bem sucedida
              </div>
            )}

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3 text-xs text-blue-300">
              💡 O Token de Acesso é necessário para enviar eventos server-side com maior precisão e sem bloqueio de navegadores.
            </div>
          </div>
        </div>
      )}

      {/* IA */}
      {activeTab === "ia" && (
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Chave API</Label>
              <div className="relative">
                <Input
                  type={showIaKey ? "text" : "password"}
                  value={iaApiKey}
                  onChange={e => setIaApiKey(e.target.value)}
                  placeholder={iaSaved ? "Chave salva — insira nova para alterar" : "Cole sua chave API aqui..."}
                  className="bg-[#0f0f0f] border-[#2a2a2a] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowIaKey(!showIaKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showIaKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {detectedProvider && providerBadges[detectedProvider] && (
                <span className="text-xs px-2 py-1 rounded bg-[#2a2a2a] inline-flex items-center gap-1">
                  {providerBadges[detectedProvider].emoji} {providerBadges[detectedProvider].label}
                </span>
              )}
              <p className="text-[10px] text-muted-foreground">Sua chave é armazenada de forma segura e nunca exibida.</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Modelo</Label>
              <Select value={iaModel} onValueChange={setIaModel} disabled={!currentModels}>
                <SelectTrigger className="bg-[#0f0f0f] border-[#2a2a2a]">
                  <SelectValue placeholder={currentModels ? "Selecione o modelo" : "Detectando provedor..."} />
                </SelectTrigger>
                <SelectContent>
                  {currentModels?.map(m => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Notificações */}
      {activeTab === "notificacoes" && (
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Nova venda identificada pela IA</Label>
                <Switch checked={notifVenda} onCheckedChange={setNotifVenda} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Nova conversa aguardando atendimento</Label>
                <Switch checked={notifConversa} onCheckedChange={setNotifConversa} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Falha no envio de evento ao Pixel</Label>
                <Switch checked={notifPixel} onCheckedChange={setNotifPixel} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm text-foreground">Lead sem resposta após timeout</Label>
                <Switch checked={notifTimeout} onCheckedChange={setNotifTimeout} />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Número para notificações</Label>
              <Input type="tel" value={notifPhone} onChange={e => setNotifPhone(e.target.value)} placeholder="+55 11 99999-9999" className="bg-[#0f0f0f] border-[#2a2a2a]" />
              <p className="text-[10px] text-muted-foreground">As notificações serão enviadas via WhatsApp</p>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 text-xs text-yellow-300">
              ⚠️ Configure um número válido para receber alertas. Certifique-se que o número está salvo em seus contatos.
            </div>
          </div>
        </div>
      )}

      {/* Botão Salvar fixo */}
      <button
        onClick={handleSave}
        className="fixed bottom-6 right-6 px-6 py-2 rounded-lg bg-[#22c55e] text-white text-sm font-medium hover:bg-[#22c55e]/90 transition-colors flex items-center gap-2 shadow-lg shadow-black/30 z-50"
      >
        <Save size={14} /> Salvar configurações
      </button>
    </div>
  );
};

export default ConfiguracoesPage;
