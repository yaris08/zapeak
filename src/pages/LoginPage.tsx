import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("zapeak_auth", "true");
    navigate("/");
  };

  const inputClass =
    "w-full rounded-[10px] pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#22c55e] transition-colors";
  const inputStyle = { backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at center, #0d1a0d 0%, #0a0a0a 70%)" }}
    >
      <div
        className="w-full max-w-[420px] rounded-2xl p-10"
        style={{
          backgroundColor: "#111",
          border: "1px solid rgba(34,197,94,0.19)",
          boxShadow: "0 0 40px rgba(34,197,94,0.08)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap size={24} color="#22c55e" />
          <span className="text-2xl font-bold text-foreground">ZaPeak</span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-[22px] font-bold text-foreground">
            {activeTab === "login" ? "Bem-vindo de volta" : "Bem-vindo"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeTab === "login" ? "Faça login para continuar" : "Crie sua conta"}
          </p>
        </div>

        {/* Tabs */}
        <div className="rounded-[10px] p-1 mb-6" style={{ backgroundColor: "#1a1a1a" }}>
          <div className="flex">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className="flex-1 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: activeTab === "login" ? "#22c55e" : "transparent",
                color: activeTab === "login" ? "#fff" : "#888",
              }}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className="flex-1 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                backgroundColor: activeTab === "register" ? "#22c55e" : "transparent",
                color: activeTab === "register" ? "#fff" : "#888",
              }}
            >
              Criar conta
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className={inputClass}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className={inputClass}
                style={inputStyle}
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

          {activeTab === "register" && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Confirmar senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua senha"
                  className={inputClass}
                  style={inputStyle}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {activeTab === "login" && (
            <div className="flex justify-center">
              <button type="button" className="text-xs hover:underline" style={{ color: "#22c55e" }}>
                Esqueci minha senha
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-12 rounded-[10px] text-sm font-bold text-white transition-colors hover:bg-[#16a34a] flex items-center justify-center gap-2"
            style={{ backgroundColor: "#22c55e" }}
          >
            {activeTab === "login" ? "Entrar" : "Criar conta"}
            <ArrowRight size={16} />
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
