
import { AppLayout } from "@/components/layout/AppLayout";
import { ModuleCard } from "@/components/modules/ModuleCard";

const modules = [
  {
    title: "Introduction to Programming",
    description: "Learn the basics of programming and computational thinking",
    progress: 75,
  },
  {
    title: "Web Development Fundamentals",
    description: "Understanding HTML, CSS, and JavaScript",
    progress: 45,
  },
  {
    title: "Data Structures",
    description: "Essential data structures and algorithms",
    progress: 30,
  },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        <section className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Continue your learning journey.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <ModuleCard 
                key={module.title} 
                {...module} 
              />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export default Index;
