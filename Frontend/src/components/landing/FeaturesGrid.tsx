import { Sparkles, Target, Zap, Shield, Clock, TrendingUp } from 'lucide-react';
import type { Feature } from './types';

export const FeaturesGrid = () => {
  const features: Feature[] = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI Resume Builder',
      description: 'Generate ATS-optimized resumes tailored to specific job descriptions instantly.',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Semantic Matching',
      description: 'Advanced algorithms match skills and experience beyond keyword matching.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'One-Click Apply',
      description: 'Apply to multiple jobs with a single click using your AI-generated profile.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy First',
      description: 'Your data is encrypted and never shared without your explicit consent.',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Real-time Updates',
      description: 'Get instant notifications when employers view your profile or shortlist you.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Career Insights',
      description: 'Access analytics on job market trends and salary benchmarks for your role.',
    },
  ];

  return (
    <section className="py-20 bg-accent/30" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful features for modern job seekers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stand out in today's competitive job market.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
