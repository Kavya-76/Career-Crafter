import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Target } from 'lucide-react';
import type { NavigationProps } from './types';

export const Hero = ({ onNavigate }: NavigationProps) => {
  const benefits = [
    { icon: <Sparkles className="w-4 h-4" />, text: 'AI-powered matching' },
    { icon: <Zap className="w-4 h-4" />, text: 'Instant resume generation' },
    { icon: <Target className="w-4 h-4" />, text: 'Smart candidate ranking' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-20 pb-24 lg:pt-28 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Craft your career with{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI-powered
              </span>{' '}
              precision
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Smart resume generation, intelligent job matching, and streamlined hiring — all in one platform.
            </p>

            {/* Benefit Chips */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border text-sm font-medium text-foreground animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {benefit.icon}
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                onClick={() => onNavigate('jobseeker')}
                data-testid="hero-jobseeker-cta"
              >
                Find jobs for me
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold border-2 hover:bg-accent transition-all hover:scale-105"
                onClick={() => onNavigate('employer')}
                data-testid="hero-employer-cta"
              >
                Post a job
              </Button>
            </div>

            {/* Trust metrics */}
            {/* <div className="flex flex-wrap gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div>
                <span className="block text-2xl font-bold text-foreground">10k+</span>
                <span>Active users</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-foreground">5k+</span>
                <span>Jobs posted</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-foreground">95%</span>
                <span>Match accuracy</span>
              </div>
            </div> */}
          </div>

          {/* Right: Visual mockup */}
          <div className="relative animate-slide-in-right">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main dashboard mockup */}
              <div className="relative rounded-2xl border-2 border-border bg-card shadow-2xl overflow-hidden">
                {/* Header bar */}
                <div className="flex items-center gap-2 p-4 border-b border-border bg-accent/50">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                
                {/* Content area */}
                <div className="p-6 space-y-4">
                  {/* Profile card */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 bg-foreground/20 rounded" />
                      <div className="h-2 w-24 bg-foreground/10 rounded" />
                    </div>
                  </div>

                  {/* Job cards */}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="p-4 rounded-lg border border-border bg-background/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-40 bg-foreground/20 rounded" />
                        <div className="h-6 w-16 bg-primary/20 rounded-full" />
                      </div>
                      <div className="h-2 w-32 bg-foreground/10 rounded" />
                      <div className="h-2 w-full bg-foreground/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-bold shadow-lg animate-pulse">
                AI Matched
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
