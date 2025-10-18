import { User, Building2, ArrowRight } from 'lucide-react';
import type { NavigationProps, RoleCardData } from './types';

export const RoleSelect = ({ onNavigate }: NavigationProps) => {
  const roles: RoleCardData[] = [
    {
      role: 'jobseeker',
      title: 'Jobseeker',
      description: 'Create your profile, generate an ATS-ready resume, and get job matches.',
    },
    {
      role: 'employer',
      title: 'Employer',
      description: 'Post jobs, view ranked candidates, and streamline hiring.',
    },
  ];

  return (
    <section className="py-20 bg-accent/30" id="role-select">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose your path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking for opportunities or talent, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {roles.map((roleData, index) => (
            <button
              key={roleData.role}
              onClick={() => onNavigate(roleData.role)}
              className="group relative p-8 rounded-2xl border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300 text-left hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
              data-testid={`role-card-${roleData.role}`}
              aria-label={`Select ${roleData.title} role`}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                {roleData.role === 'jobseeker' ? (
                  <User className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                ) : (
                  <Building2 className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {roleData.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {roleData.description}
              </p>

              {/* Arrow indicator */}
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                <span>Get started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Hover gradient effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300 -z-10" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
