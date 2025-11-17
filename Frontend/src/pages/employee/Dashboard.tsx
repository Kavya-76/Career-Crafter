import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Briefcase, Star, Clock, CheckCircle, Eye, Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const applicationStats = [
  { label: "Total Applications", value: 24, icon: Briefcase, color: "text-blue-500" },
  { label: "Shortlisted", value: 8, icon: CheckCircle, color: "text-green-500" },
  { label: "Interviews", value: 3, icon: Clock, color: "text-orange-500" },
  { label: "Saved Jobs", value: 12, icon: Star, color: "text-yellow-500" },
];

const recommendedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$120k - $150k",
  },
  {
    id: 2,
    title: "React Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$130k - $170k",
  },
  {
    id: 3,
    title: "Software Engineer Intern",
    company: "Microsoft",
    location: "Redmond, WA",
    type: "Internship",
    salary: "$8k/month",
  },
];

export default function EmployeeDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-2">
            Track your job search progress and discover new opportunities.
          </p>
        </div>

        {/* Profile Completion Card */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Profile Completion
            </CardTitle>
            <CardDescription>Complete your profile to get better job matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-foreground">80%</div>
              <Button>Complete Profile</Button>
            </div>
            <Progress value={80} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Add your work experience and skills to reach 100%
            </p>
          </CardContent>
        </Card>

        {/* Application Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {applicationStats.map((stat) => (
            <Card key={stat.label} className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommended Jobs */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Recommended Jobs</CardTitle>
            <CardDescription>Based on your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendedJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1 mb-3 sm:mb-0">
                  <h4 className="font-semibold text-foreground">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{job.type}</Badge>
                    <Badge variant="outline">{job.salary}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Resume Insights */}
        <Card className="border-border shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Resume Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              💡 Add <span className="font-semibold">React</span> and{" "}
              <span className="font-semibold">Next.js</span> to your skill set to improve your job
              matches by <span className="font-semibold text-primary">20%</span>.
            </p>
            <Button variant="outline" className="mt-4">
              Update Skills
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
