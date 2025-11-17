import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ResumePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Resume</h2>
          <p className="text-muted-foreground mt-2">
            Manage and optimize your resume with AI assistance
          </p>
        </div>

        <Card className="border-border shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Resume Builder
            </CardTitle>
            <CardDescription>
              Create an ATS-optimized resume tailored to your target jobs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Resume
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Current Resume</CardTitle>
            <CardDescription>Your latest resume version</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-border rounded-lg p-6 bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">Kavya_Resume_2024.pdf</h4>
                    <p className="text-sm text-muted-foreground">Last updated: Jan 15, 2024</p>
                  </div>
                </div>
                <Badge variant="secondary">ATS Score: 85%</Badge>
              </div>

              {/* Resume Preview */}
              <div className="border border-border rounded-lg p-6 bg-background space-y-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Kavya</h3>
                  <p className="text-sm text-muted-foreground">Frontend Developer | React Specialist</p>
                  <p className="text-sm text-muted-foreground">kavya@example.com | (555) 123-4567</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Professional Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    Passionate frontend developer with 3+ years of experience building modern web
                    applications using React, TypeScript, and modern web technologies...
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"].map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Experience</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-foreground">Frontend Developer</p>
                      <p className="text-sm text-muted-foreground">Tech Company • 2022 - Present</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline">Edit Resume</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Resume Tips</CardTitle>
            <CardDescription>AI-powered suggestions to improve your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Add quantifiable achievements to your work experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Include relevant keywords from job descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Keep your resume to one page if you have less than 5 years of experience</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
