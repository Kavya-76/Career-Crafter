import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormInput } from "@/components/auth/FormInput";
import { Briefcase, Mail } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Login = () => {
  const { role = "employee" } = useParams<{ role: "employee" | "employer" }>();
  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const isEmployer = role === "employer";
  const accentColor = isEmployer
    ? "hsl(var(--role-employer))"
    : "hsl(var(--role-employee))";
  const accentHoverColor = isEmployer
    ? "hsl(var(--role-employer-hover))"
    : "hsl(var(--role-employee-hover))";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
          role: role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Login successful!", {
        description: `Welcome back, ${response.data.name || "user"}!`,
      });

      login(response.data.token, response.data.role, response.data.user);
      if (response.data.role === "employer") {
        navigate("/employer/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Invalid email or password.";
      toast.error("Login failed", { description: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.success("Google OAuth", {
      description: "Google sign-in integration coming soon!",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Gradient background */}
      <div
        className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center items-center text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentHoverColor})`,
        }}
      >
        <div className="relative z-10 max-w-md">
          <Briefcase className="w-16 h-16 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Welcome to Career Crafter</h1>
          <p className="text-lg opacity-90">
            {isEmployer
              ? "Find the perfect candidates for your company and streamline your hiring process."
              : "Discover your dream job and take the next step in your career journey."}
          </p>
        </div>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ background: accentColor }}
              >
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                Career Crafter
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Login as {isEmployer ? "Employer" : "Job Seeker"}
            </h1>
            <p className="text-muted-foreground">
              {isEmployer
                ? "Access your employer dashboard"
                : "Continue your job search journey"}
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>
                Enter your credentials to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData({ ...formData, email: value })
                  }
                  error={errors.email}
                  placeholder="you@example.com"
                  required
                />

                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(value) =>
                    setFormData({ ...formData, password: value })
                  }
                  error={errors.password}
                  placeholder="••••••••"
                  required
                />

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm hover:underline"
                    style={{ color: accentColor }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full text-white hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: accentColor,
                  }}
                  disabled={isLoading}
                  data-testid="login-button"
                >
                  {isLoading ? "Signing in..." : "Login"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Don't have an account?{" "}
                  <Link
                    to={`/register/${role}`}
                    className="font-medium hover:underline"
                    style={{ color: accentColor }}
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
