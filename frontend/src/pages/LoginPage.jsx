import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/animations/Login.json";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }
    await login(formData);
  };

  return (
    <div className="min-h-screen bg-base-300 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-secondary/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />

      <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-base-100/50 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10">
        <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="flex lg:hidden justify-center mb-6">
            <div className="w-64 h-64">
              <Lottie
                animationData={loginAnimation}
                loop={true}
                className="w-full h-full drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-left">
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-0.5 mb-4 shadow-lg shadow-primary/20">
                <div className="bg-base-100 size-full rounded-[14px] flex items-center justify-center">
                  <MessageSquare className="size-6 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Welcome back.
              </h1>
              <p className="text-base-content/60 mt-2 font-medium">
                Please enter your details to sign in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label-text font-semibold ml-1 mb-2 block text-sm">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 bg-base-200/40 focus:bg-base-200 transition-all border-white/5 focus:border-primary/50"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <div className="flex justify-between items-center ml-1 mb-2">
                  <label className="label-text font-semibold text-sm">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    size="xs"
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 bg-base-200/40 focus:bg-base-200 transition-all border-white/5 focus:border-primary/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-base-300 rounded-md transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4 text-base-content/40" />
                    ) : (
                      <Eye className="size-4 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Signing in...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <Sparkles className="size-4" />
                  </span>
                )}
              </button>
            </form>

            <p className="text-center text-base-content/60 text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-bold hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex bg-gradient-to-br from-primary/10 to-secondary/10 items-center justify-center p-12 relative overflow-hidden order-1 lg:order-2">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />

          <div className="max-w-md text-center space-y-4 relative z-10">
            <Lottie
              animationData={loginAnimation}
              loop={true}
              className="w-full drop-shadow-2xl"
            />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Stay in the loop.
            </h2>
            <p className="text-base-content/70 font-medium">
              Join thousands of users enjoying real-time connections and
              crystal-clear media sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
