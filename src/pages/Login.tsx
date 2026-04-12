import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import ellineLogo from "@/assets/elline-logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    const success = login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-accent flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-secondary/20" />
        <div className="relative z-10 text-center">
          <img src={ellineLogo} alt="Elline Food Products" width={120} height={120} className="mx-auto mb-6" />
          <h2 className="text-lg font-body font-medium text-muted-foreground mb-4">Elline Food Products</h2>
          <h1 className="font-heading text-5xl font-bold text-foreground leading-tight">
            Login to<br />
            <span className="text-primary">System</span>
          </h1>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-card">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2 font-body">Please enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Username
              </Label>
              <Input
                id="username"
                placeholder="elline.admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Password
                </Label>
                <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-background border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-destructive text-sm font-medium">{error}</p>
            )}

            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base gap-2">
              Sign In <ArrowRight size={18} />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Demo: <span className="font-medium text-foreground">elline.admin</span> / <span className="font-medium text-foreground">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
