import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

const applications = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "Amazon",
    appliedDate: "2024-01-15",
    status: "Interview",
  },
  {
    id: 2,
    position: "React Engineer",
    company: "Google",
    appliedDate: "2024-01-12",
    status: "Shortlisted",
  },
  {
    id: 3,
    position: "Software Engineer Intern",
    company: "Microsoft",
    appliedDate: "2024-01-10",
    status: "Under Review",
  },
  {
    id: 4,
    position: "Full Stack Developer",
    company: "Meta",
    appliedDate: "2024-01-08",
    status: "Rejected",
  },
  {
    id: 5,
    position: "UI/UX Developer",
    company: "Apple",
    appliedDate: "2024-01-05",
    status: "Applied",
  },
];

const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Interview":
      return "default";
    case "Shortlisted":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export default function ApplicationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">My Applications</h2>
          <p className="text-muted-foreground mt-2">
            Track all your job applications in one place
          </p>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Application History</CardTitle>
            <CardDescription>View and manage your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.position}</TableCell>
                      <TableCell>{app.company}</TableCell>
                      <TableCell>{app.appliedDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(app.status)}>{app.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
