import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff } from "lucide-react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("zapeak_auth", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="w-full max-w-[400px] rounded-xl p-10" style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Zap size={24} color="#22c55e" />
            <span className="text-xl font-bold text-foreground">ZaPeak</span>
          </div>
          <p className="text-sm text-muted-foreground">Automação inteligente para WhatsApp</p>
        </div>

        <div className="h-px w-full mb-6" style={{ backgroundColor: "#2a2a2a" }} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              style={{ backgroundColor: "#0f0f0f", border: "1px solid #2a2a2a" }}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                style={{ backgroundColor: "#0f0f0f", border: "1px solid #2a2a2a" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs hover:underline" style={{ color: "#22c55e" }}>
              Esqueci minha senha
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md text-sm font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#22c55e" }}
          >
            Entrar
          </button>

          <p className="text-center text-xs text-muted-foreground">
            Não tem conta?{" "}
            <button type="button" className="hover:underline" style={{ color: "#22c55e" }}>
              Fale conosco
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
