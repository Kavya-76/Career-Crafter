import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

const PREDEFINED_SKILLS = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python", "Java",
  "HTML/CSS", "Tailwind CSS", "Git", "MongoDB", "PostgreSQL",
  "AWS", "Docker", "Kubernetes", "Next.js", "Vue.js", "Angular",
  "Express.js", "GraphQL", "REST API", "CI/CD", "Agile",
  "Communication", "Leadership",
];

// Interfaces (frontend only)
interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string;
  link: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function ProfilePage() {
  const { token, user } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Personal Info
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");

  // Skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");

  // Experience
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Education
  const [educations, setEducations] = useState<Education[]>([]);

  // Projects
  const [projects, setProjects] = useState<Project[]>([]);

  // Achievements
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Fetch user profile
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${backendUrl}/api/userProfile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const p = res.data.profile;
        if (!p) return;

        setHeadline(p.headline || "");
        setBio(p.bio || "");

        setSelectedSkills(p.skills || []);

        // Load experiences
        if (p.experience?.length) {
          setExperiences(
            p.experience.map((e: any) => ({
              id: Date.now().toString() + Math.random(),
              ...e,
              startDate: e.startDate?.substring(0, 10) || "",
              endDate: e.endDate?.substring(0, 10) || "",
            }))
          );
        }

        // Load education
        if (p.education?.length) {
          setEducations(
            p.education.map((e: any) => ({
              id: Date.now().toString() + Math.random(),
              ...e,
              startYear: e.startYear?.substring(0, 10) || "",
              endYear: e.endYear?.substring(0, 10) || "",
            }))
          );
        }

        // Load projects
        if (p.projects?.length) {
          setProjects(
            p.projects.map((proj: any) => ({
              id: Date.now().toString() + Math.random(),
              ...proj,
              techStack: (proj.techStack || []).join(", "),
            }))
          );
        }

        // Load achievements
        if (p.achievements?.length) {
          setAchievements(
            p.achievements.map((ach: any) => ({
              id: Date.now().toString() + Math.random(),
              ...ach,
              date: ach.year ? `${ach.year}-01-01` : "",
            }))
          );
        }
      })
      .catch(() => {});
  }, [token]);

  // ================ Skills Handlers ==================
  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  // ================ Experience ==================
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now().toString(),
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  // ================ Education ==================
  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now().toString(),
        school: "",
        degree: "",
        field: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducations(educations.filter((e) => e.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  // ================ Projects ==================
  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        techStack: "",
        link: "",
      },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  // ================ Achievements ==================
  const addAchievement = () => {
    setAchievements([
      ...achievements,
      { id: Date.now().toString(), title: "", description: "", date: "" },
    ]);
  };

  const removeAchievement = (id: string) => {
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    setAchievements(achievements.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  // ================ Save Handler ==================
  const handleSave = async () => {
    const payload = {
      headline,
      bio,
      skills: selectedSkills,

      experience: experiences.map(({ id, ...rest }) => ({
        ...rest,
      })),

      education: educations.map(({ id, ...rest }) => ({
        ...rest,
      })),

      projects: projects.map(({ id, techStack, ...rest }) => ({
        ...rest,
        techStack: techStack.split(",").map((t) => t.trim()).filter(Boolean),
      })),

      achievements: achievements.map(({ id, date, ...rest }) => ({
        ...rest,
        year: date ? new Date(date).getFullYear() : null,
      })),
    };

    try {
      await axios.post(`${backendUrl}/api/userProfile`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Profile Updated", {
        description: "Your profile was saved successfully!",
      });
    } catch (err) {
      console.error(err);
      toast.error("Update Failed", {
        description: "Could not update your profile.",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground mt-2">
            Build a comprehensive profile to showcase your skills and experience
          </p>
        </div>

        {/* ------- Personal Information ------- */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your basic profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={email} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Headline</Label>
              <Input
                value={headline}
                placeholder="Frontend Developer | React Enthusiast"
                onChange={(e) => setHeadline(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={bio}
                rows={4}
                placeholder="Tell us about yourself"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* ------- Skills ------- */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Select your skills or add custom ones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Select Skills</Label>
            <Select onValueChange={addSkill}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a skill" />
              </SelectTrigger>
              <SelectContent>
                {PREDEFINED_SKILLS.filter((s) => !selectedSkills.includes(s)).map(
                  (skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                value={customSkill}
                placeholder="Enter custom skill"
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
              />
              <Button onClick={addCustomSkill}>
                <Plus size={16} />
              </Button>
            </div>

            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                    <X
                      className="h-3 w-3 ml-2 cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ------- Experience ------- */}
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Experience</CardTitle>
              <CardDescription>Add your work experience</CardDescription>
            </div>
            <Button onClick={addExperience} size="sm">
              <Plus className="mr-2" size={16} /> Add Experience
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {experiences.length === 0 && (
              <p className="text-sm text-muted-foreground">No experience added yet.</p>
            )}

            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="border p-4 rounded-lg relative space-y-4"
              >
                {experiences.length > 0 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="text-destructive" size={16} />
                  </Button>
                )}

                <h4 className="font-medium text-sm text-muted-foreground">
                  Experience {idx + 1}
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(exp.id, "role", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "startDate", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "endDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    rows={3}
                    onChange={(e) =>
                      updateExperience(exp.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ------- Education ------- */}
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add your educational background</CardDescription>
            </div>
            <Button onClick={addEducation} size="sm">
              <Plus className="mr-2" size={16} /> Add Education
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {educations.length === 0 && (
              <p className="text-sm text-muted-foreground">No education added yet.</p>
            )}

            {educations.map((edu, idx) => (
              <div
                key={edu.id}
                className="border p-4 rounded-lg relative space-y-4"
              >
                {educations.length > 0 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="text-destructive" size={16} />
                  </Button>
                )}

                <h4 className="font-medium text-sm text-muted-foreground">
                  Education {idx + 1}
                </h4>

                <div className="space-y-2">
                  <Label>School / University</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) =>
                      updateEducation(edu.id, "school", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) =>
                      updateEducation(edu.id, "field", e.target.value)
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Year</Label>
                    <Input
                      type="date"
                      value={edu.startYear}
                      onChange={(e) =>
                        updateEducation(edu.id, "startYear", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Year</Label>
                    <Input
                      type="date"
                      value={edu.endYear}
                      onChange={(e) =>
                        updateEducation(edu.id, "endYear", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={2}
                    value={edu.description}
                    onChange={(e) =>
                      updateEducation(edu.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ------- Projects ------- */}
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Showcase your projects</CardDescription>
            </div>
            <Button onClick={addProject} size="sm">
              <Plus className="mr-2" size={16} /> Add Project
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {projects.length === 0 && (
              <p className="text-sm text-muted-foreground">No projects added yet.</p>
            )}

            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="border p-4 rounded-lg relative space-y-4"
              >
                {projects.length > 1 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2"
                    onClick={() => removeProject(proj.id)}
                  >
                    <Trash2 className="text-destructive" size={16} />
                  </Button>
                )}

                <h4 className="font-medium text-sm text-muted-foreground">
                  Project {idx + 1}
                </h4>

                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={proj.name}
                    onChange={(e) =>
                      updateProject(proj.id, "name", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={proj.description}
                    onChange={(e) =>
                      updateProject(proj.id, "description", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tech Stack</Label>
                  <Input
                    placeholder="React, Node.js, MongoDB"
                    value={proj.techStack}
                    onChange={(e) =>
                      updateProject(proj.id, "techStack", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  
                  <Label>Project Link</Label>
                  <Input
                    type="url"
                    value={proj.link}
                    onChange={(e) =>
                      updateProject(proj.id, "link", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ------- Achievements ------- */}
        <Card>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Add your awards and accomplishments</CardDescription>
            </div>
            <Button onClick={addAchievement} size="sm">
              <Plus className="mr-2" size={16} /> Add Achievement
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {achievements.length === 0 && (
              <p className="text-sm text-muted-foreground">No achievements added yet.</p>
            )}

            {achievements.map((ach, idx) => (
              <div
                key={ach.id}
                className="border p-4 rounded-lg relative space-y-4"
              >
                {achievements.length > 1 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2"
                    onClick={() => removeAchievement(ach.id)}
                  >
                    <Trash2 className="text-destructive" size={16} />
                  </Button>
                )}

                <h4 className="font-medium text-sm text-muted-foreground">
                  Achievement {idx + 1}
                </h4>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={ach.title}
                    onChange={(e) =>
                      updateAchievement(ach.id, "title", e.target.value)
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={ach.date}
                      onChange={(e) =>
                        updateAchievement(ach.id, "date", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={2}
                    value={ach.description}
                    onChange={(e) =>
                      updateAchievement(ach.id, "description", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ------- Save Buttons ------- */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
