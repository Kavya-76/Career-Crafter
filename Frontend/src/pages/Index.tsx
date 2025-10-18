import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/landing/TopNav";
import { Hero } from "@/components/landing/Hero";
import { RoleSelect } from "@/components/landing/RoleSelect";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Footer } from "@/components/landing/Footer";
import type { UserRole } from "@/components/landing/types";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigate = (role: UserRole) => {
    // Navigate to registration with role pre-selected
    navigate(`/register/${role}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main>
        <Hero onNavigate={handleNavigate} />
        <RoleSelect onNavigate={handleNavigate} />
        <HowItWorks />
        <FeaturesGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
