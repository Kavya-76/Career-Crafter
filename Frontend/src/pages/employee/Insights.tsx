import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Lightbulb } from "lucide-react";

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Career Insights</h2>
          <p className="text-muted-foreground mt-2">
            AI-powered analytics and recommendations for your job search
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Profile Views
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">247</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Application Rate
              </CardTitle>
              <Target className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">18%</div>
              <p className="text-xs text-muted-foreground mt-1">Response rate</p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Skill Match
              </CardTitle>
              <TrendingDown className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">72%</div>
              <p className="text-xs text-muted-foreground mt-1">Average job match score</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Personalized tips to boost your job search</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Badge className="mt-1">Skills</Badge>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Add In-Demand Skills</h4>
                  <p className="text-sm text-muted-foreground">
                    Jobs requiring <span className="font-medium">TypeScript</span> and{" "}
                    <span className="font-medium">GraphQL</span> have 30% higher response rates in
                    your field.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Badge className="mt-1">Network</Badge>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Expand Your Network</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect with 5 more people in your industry to increase visibility by 40%.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Badge className="mt-1">Profile</Badge>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Update Your Headline</h4>
                  <p className="text-sm text-muted-foreground">
                    Profiles with clear, keyword-rich headlines receive 2.5x more views.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Industry Trends</CardTitle>
            <CardDescription>Top skills and roles in demand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">React</span>
                  <span className="text-sm text-muted-foreground">High Demand</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "90%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">TypeScript</span>
                  <span className="text-sm text-muted-foreground">High Demand</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "85%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Node.js</span>
                  <span className="text-sm text-muted-foreground">Medium Demand</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
