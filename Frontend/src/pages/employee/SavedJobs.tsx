import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Send, MapPin, DollarSign } from "lucide-react";

const savedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    salary: "$150k - $180k",
    savedDate: "2024-01-16",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140k - $170k",
    savedDate: "2024-01-14",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Stripe",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $160k",
    savedDate: "2024-01-12",
  },
  {
    id: 4,
    title: "UI Developer",
    company: "Shopify",
    location: "Toronto, Canada",
    type: "Full-time",
    salary: "$120k - $150k",
    savedDate: "2024-01-10",
  },
];

export default function SavedJobsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Saved Jobs</h2>
          <p className="text-muted-foreground mt-2">
            Jobs you've bookmarked for later
          </p>
        </div>

        <div className="grid gap-4">
          {savedJobs.map((job) => (
            <Card key={job.id} className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-base">{job.company}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge variant="outline">Saved on {job.savedDate}</Badge>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
