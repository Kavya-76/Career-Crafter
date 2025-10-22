import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export function useHandleGoogleAuth() {
  const navigate = useNavigate();
  const { role = "employee" } = useParams<{ role?: "employee" | "employer" }>();
  const { login } = useAuth(); // stores JWT & user
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = useGoogleLogin({
    flow: "implicit", // popup-based login
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        if (!accessToken) {
          toast.error("Google login failed: No access token received");
          return;
        }


        // ✅ Send access token to backend
        const res = await axios.post(
          `${backendUrl}/api/auth/google`,
          { accessToken, role },
          { headers: { "Content-Type": "application/json" } }
        );


        const { token: jwt, user } = res.data;

        login(jwt, user.role, user);

        toast.success("Logged in with Google!", {
          description: `Welcome back, ${user?.name ?? "there"}!`,
        });

        navigate("/dashboard");
      } catch (err: any) {
        console.error("Google auth error:", err);
        const message = err?.response?.data?.message ?? "Google login failed";
        toast.error("Google login failed", { description: message });
      }
    },
    onError: () => {
      toast.error("Google login cancelled or failed");
    },
  });

  return handleLogin; // call this function on your "Sign in with Google" button
}
