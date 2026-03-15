import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import signUpAnimation from "../assets/animations/Profile.json";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() !== true) return;

    const success = await signup(formData);
    if (success) navigate("/login");
  };

  return (
    <div className="min-h-screen bg-base-300 relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] animate-pulse" />

      <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-base-100/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-10">
        <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="flex lg:hidden justify-center mb-6">
            <div className="w-64 h-64">
              <Lottie
                animationData={signUpAnimation}
                loop={true}
                className="w-full h-full drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-left">
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-0.5 mb-4">
                <div className="bg-base-100 size-full rounded-[14px] flex items-center justify-center">
                  <MessageSquare className="size-6 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Join the flow.
              </h1>
              <p className="text-base-content/60 mt-2">
                Create an account to start chatting with the world.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-control">
                <label className="label-text font-semibold ml-1 mb-2 block">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-200 transition-all border-white/5 focus:border-primary/50"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label-text font-semibold ml-1 mb-2 block">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-200 border-white/5 focus:border-primary/50"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label-text font-semibold ml-1 mb-2 block">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-200 border-white/5 focus:border-primary/50"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Creating
                    Account...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    Get Started <Sparkles className="size-4" />
                  </span>
                )}
              </button>
            </form>

            <p className="text-center text-base-content/60">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-primary font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex bg-gradient-to-br from-primary/10 to-secondary/10 items-center justify-center p-12 relative order-1 lg:order-2">
          <div className="max-w-md text-center space-y-4">
            <Lottie
              animationData={signUpAnimation}
              loop={true}
              className="w-full drop-shadow-2xl"
            />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Step into the future of chat.
            </h2>
            <p className="text-base-content/70">
              Experience seamless real-time communication with encrypted privacy
              and stunning media sharing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
