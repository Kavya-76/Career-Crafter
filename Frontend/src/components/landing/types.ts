export type UserRole = 'jobseeker' | 'employer';

export interface NavigationProps {
  onNavigate: (role: UserRole) => void;
}

export interface RoleCardData {
  role: UserRole;
  title: string;
  description: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}
