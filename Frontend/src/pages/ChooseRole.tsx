import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { User, Building2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ChooseRole = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const intent = searchParams.get('intent') || 'login'; // default to login

  const handleRoleSelect = (role: 'employee' | 'employer') => {
    if (intent === 'register') {
      navigate(`/register/${role}`);
    } else {
      navigate(`/login/${role}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Career Crafter</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Choose Your Role
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select how you want to continue on this platform.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Job Seeker Card */}
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <User className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <CardTitle className="text-2xl">I'm a Job Seeker</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base leading-relaxed">
                Looking for your next career opportunity? Create your profile, 
                generate an ATS-ready resume, and get matched with jobs that 
                fit your skills and experience.
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                className="w-full h-12 text-base" 
                size="lg"
                onClick={() => handleRoleSelect('employee')}
              >
                Continue as Job Seeker
              </Button>
            </CardFooter>
          </Card>

          {/* Employer Card */}
          <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 hover:border-primary/50">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Building2 className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <CardTitle className="text-2xl">I'm an Employer</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-base leading-relaxed">
                Ready to find top talent? Post job openings, review ranked 
                candidates, and streamline your hiring process with AI-powered 
                matching technology.
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                className="w-full h-12 text-base" 
                size="lg"
                onClick={() => handleRoleSelect('employer')}
              >
                Continue as Employer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
