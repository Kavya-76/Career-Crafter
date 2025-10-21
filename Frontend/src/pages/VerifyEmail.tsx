import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from "axios"

type VerificationState = 'loading' | 'success' | 'error';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<VerificationState>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {  
        setState('error');
        setMessage('Verification token is missing.');
        return;
      }

      try {
        const res = await axios.post(`${backendUrl}/api/auth/verify-email?token=${token}`);
        
        if (res) {
          setState('success');
          setMessage('Your email has been successfully verified!');
        } else {
          setState('error');
          setMessage('Verification link is invalid or has expired.');
        }
      } catch (error) {
        setState('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleGoToLogin = () => {
    navigate('/choose-role?intent=login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-border shadow-lg">
          <CardContent className="pt-12 pb-8 px-8">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Icon and Status */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.2, 
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
              >
                {state === 'loading' && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
                    </div>
                  </div>
                )}
                
                {state === 'success' && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                  </div>
                )}
                
                {state === 'error' && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center">
                      <XCircle className="w-12 h-12 text-destructive-foreground" />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <h1 className="text-2xl font-bold text-foreground">
                  {state === 'loading' && 'Verifying Your Email'}
                  {state === 'success' && 'Email Verified!'}
                  {state === 'error' && 'Verification Failed'}
                </h1>
                <p className="text-muted-foreground">
                  {state === 'loading' && 'Please wait while we verify your email address...'}
                  {message}
                </p>
              </motion.div>

              {/* Action Button */}
              {state !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full pt-4"
                >
                  <Button
                    onClick={handleGoToLogin}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    Go to Login
                  </Button>
                </motion.div>
              )}

              {/* Brand Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-6 border-t border-border w-full"
              >
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">Career Crafter</span>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
