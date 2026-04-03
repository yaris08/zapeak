import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import HomePage from "@/pages/HomePage";
import FlowsPage from "@/pages/FlowsPage";
import FlowEditor from "@/pages/FlowEditor";
import AtendimentoPage from "@/pages/AtendimentoPage";
import InstanciasPage from "@/pages/InstanciasPage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import AtribuicaoPage from "@/pages/AtribuicaoPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import ContatosPage from "@/pages/ContatosPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("zapeak_auth") === "true"
  );

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(localStorage.getItem("zapeak_auth") === "true");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route element={<AppLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/flows" element={<FlowsPage />} />
                  <Route path="/atendimento" element={<AtendimentoPage />} />
                  <Route path="/instancias" element={<InstanciasPage />} />
                  <Route path="/relatorios" element={<RelatoriosPage />} />
                  <Route path="/atribuicao" element={<AtribuicaoPage />} />
                  <Route path="/configuracoes" element={<ConfiguracoesPage />} />
                  <Route path="/contatos" element={<ContatosPage />} />
                </Route>
                <Route path="/flows/:id/editor" element={<FlowEditor />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
