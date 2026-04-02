import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import HomePage from "@/pages/HomePage";
import FlowsPage from "@/pages/FlowsPage";
import FlowEditor from "@/pages/FlowEditor";
import AtendimentoPage from "@/pages/AtendimentoPage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import AtribuicaoPage from "@/pages/AtribuicaoPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/flows" element={<FlowsPage />} />
            <Route path="/atendimento" element={<AtendimentoPage />} />
            <Route path="/relatorios" element={<RelatoriosPage />} />
          </Route>
          <Route path="/flows/:id/editor" element={<FlowEditor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
