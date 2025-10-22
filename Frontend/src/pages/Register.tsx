import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormInput } from '@/components/auth/FormInput';
import { Briefcase, Mail } from 'lucide-react';
import {toast} from "sonner"
import axios from "axios"
import { useHandleGoogleAuth } from '@/hooks/useHandleGoogleAuth';
const backendUrl = import.meta.env.VITE_BACKEND_URL

const Register = () => {
  const { role = "employee" } = useParams<{ role: "employee" | "employer" }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (!formData.name) {
      newErrors.name = `${isEmployer ? "Company name" : "Full name"} is required`;
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        `${backendUrl}/api/auth/signup`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // 🎉 Enhanced Toast Banner
      toast.success("Verification Email Sent!", {
        description: `Welcome to Career Crafter, ${formData.name}. Please verify your email before logging in.`,
        duration: 6000,
        style: {
          borderLeft: `6px solid ${accentColor}`,
          background: "#f0fdf4",
          color: "#065f46",
          fontWeight: 500,
        },
        action: {
          label: "Go to Login",
          onClick: () => navigate(`/login/${role}`),
        },
      });

      // Optional: Navigate after short delay
      setTimeout(() => navigate(`/login/${role}`), 2500);
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message ||
        "Failed to create account. Please try again later.";

      toast.error("Signup failed", {
        description: errMsg,
        duration: 5000,
        style: {
          borderLeft: "6px solid #ef4444",
          background: "#fef2f2",
          color: "#991b1b",
          fontWeight: 500,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Google OAuth", {
      description: "Google sign-up integration coming soon!",
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
          <h1 className="text-4xl font-bold mb-4">Join Career Crafter</h1>
          <p className="text-lg opacity-90">
            {isEmployer
              ? "Start finding the best talent for your company. Create your employer account and post your first job today."
              : "Take control of your career. Create your profile and get matched with opportunities that fit your skills."}
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
              Signup as {isEmployer ? "Employer" : "Job Seeker"}
            </h1>
            <p className="text-muted-foreground">
              {isEmployer
                ? "Create your employer account"
                : "Start your job search today"}
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput
                  id="name"
                  label={isEmployer ? "Company Name" : "Full Name"}
                  type="text"
                  value={formData.name}
                  onChange={(value) =>
                    setFormData({ ...formData, name: value })
                  }
                  error={errors.name}
                  placeholder={isEmployer ? "Acme Corp" : "John Doe"}
                  required
                />

                <FormInput
                  id="email"
                  label={isEmployer ? "Company Email" : "Email"}
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

                <FormInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(value) =>
                    setFormData({ ...formData, confirmPassword: value })
                  }
                  error={errors.confirmPassword}
                  placeholder="••••••••"
                  required
                />

                <Button
                  type="submit"
                  className="w-full text-white hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: accentColor,
                  }}
                  disabled={isLoading}
                  data-testid="signup-button"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
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
                  onClick={()=>useHandleGoogleAuth()}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Sign up with Google
                </Button>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Already have an account?{" "}
                  <Link
                    to={`/login/${role}`}
                    className="font-medium hover:underline"
                    style={{ color: accentColor }}
                  >
                    Login
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

export default Register;
