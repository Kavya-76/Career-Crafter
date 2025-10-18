import { UserPlus, FileText, CheckCircle } from 'lucide-react';
import type { Step } from './types';

export const HowItWorks = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Create your profile',
      description: 'Sign up and tell us about your skills, experience, and career goals.',
    },
    {
      number: 2,
      title: 'AI generates your resume',
      description: 'Our AI creates an ATS-optimized resume tailored to your target roles.',
    },
    {
      number: 3,
      title: 'Get matched & apply',
      description: 'Receive personalized job matches and apply with one click.',
    },
  ];

  const icons = [
    <UserPlus className="w-8 h-8" />,
    <FileText className="w-8 h-8" />,
    <CheckCircle className="w-8 h-8" />,
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-background" id="how-it-works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in three simple steps and land your dream job faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <button
              key={step.number}
              onClick={() => scrollToSection('role-select')}
              className="group relative text-center hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 rounded-xl"
              aria-label={`Step ${step.number}: ${step.title}`}
            >
              {/* Connecting line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 -z-10" />
              )}

              {/* Step icon */}
              <div className="relative mx-auto w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground mb-6 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all">
                {icons[index]}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center font-bold text-sm text-primary">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
