import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Index from "@/pages/Index";
import ChooseRole from "@/pages/ChooseRole";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import NotFound from "@/pages/NotFound";
import EmployeeDashboard from "./components/employee/Dashboard";
import EmployerDashboard from "./components/employer/Dashboard";
import VerifyEmail from "@/pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

// ---------- Protected Route ----------
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: "employee" | "employer";
}

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const {role, token, user} = useAuth();

  if (token) {
    // Redirect based on role if already logged in
    if (role === "employee") return <Navigate to="/employee/dashboard" replace />;
    if (role === "employer") return <Navigate to="/employer/dashboard" replace />;
  }

  return children;
};


const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const {role, token, user} = useAuth();

  if(!token) return <Navigate to="/choose-role" replace />;
  if(allowedRole && role!==allowedRole)
    return <Navigate to="/" replace />;
  return children;
};

// ---------- App Component ----------
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="career-crafter-theme">
        <TooltipProvider>
          <Toaster />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicRoute><Index /></PublicRoute>} />
                <Route path="/choose-role" element={<PublicRoute><ChooseRole /></PublicRoute>} />
                <Route path="/login/:role" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/register/:role" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/verify-email" element={<PublicRoute><VerifyEmail /></PublicRoute>} />
                <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

                {/* Protected Routes */}
                <Route
                  path="/employee/dashboard"
                  element={
                    <ProtectedRoute allowedRole="employee">
                      <EmployeeDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/dashboard"
                  element={
                    <ProtectedRoute allowedRole="employer">
                      <EmployerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Catch All */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
