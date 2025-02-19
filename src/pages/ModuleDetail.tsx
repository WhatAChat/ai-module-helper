
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AIChat } from "@/components/ai/AIChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for module content
const moduleContents = {
  "Introduction to Programming": {
    content: `
      # Introduction to Programming

      ## What is Programming?
      Programming is the process of creating a set of instructions that tell a computer how to perform a task. 
      
      ## Key Concepts
      1. **Variables and Data Types**
         - Numbers
         - Strings
         - Booleans
         
      2. **Control Structures**
         - If statements
         - Loops
         - Functions
         
      3. **Problem Solving**
         - Breaking down problems
         - Algorithm development
         - Debugging strategies
    `,
    sections: ["Basics", "Variables", "Control Flow"]
  },
  "Web Development Fundamentals": {
    content: `
      # Web Development Fundamentals

      ## HTML Basics
      HTML is the standard markup language for creating web pages.

      ## CSS Fundamentals
      CSS is used to style and layout web pages.

      ## JavaScript Introduction
      JavaScript makes web pages interactive.
    `,
    sections: ["HTML", "CSS", "JavaScript"]
  },
  "Data Structures": {
    content: `
      # Data Structures

      ## Arrays
      Arrays are ordered collections of items.

      ## Linked Lists
      A linked list is a sequence of elements where each element points to the next element.

      ## Trees
      Trees are hierarchical data structures with a root value and subtrees of children.
    `,
    sections: ["Arrays", "Linked Lists", "Trees"]
  }
};

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const moduleData = moduleContents[moduleId as keyof typeof moduleContents];

  if (!moduleData) {
    return (
      <AppLayout>
        <div className="text-center p-8">
          <h1 className="text-2xl font-semibold">Module not found</h1>
          <p className="text-muted-foreground mt-2">
            The requested module could not be found.
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module Content */}
          <section className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{moduleId}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="prose prose-sm max-w-none">
                    <div className="space-y-6">
                      {moduleData.content.split('\n').map((line, index) => {
                        if (line.startsWith('# ')) {
                          return <h1 key={index} className="text-2xl font-bold mt-6">{line.replace('# ', '')}</h1>;
                        }
                        if (line.startsWith('## ')) {
                          return <h2 key={index} className="text-xl font-semibold mt-4">{line.replace('## ', '')}</h2>;
                        }
                        if (line.startsWith('- ')) {
                          return <li key={index} className="ml-4">{line.replace('- ', '')}</li>;
                        }
                        if (line.trim().length > 0) {
                          return <p key={index} className="text-gray-600">{line}</p>;
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </section>

          {/* AI Assistant */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">AI Learning Assistant</h2>
            <AIChat moduleTitle={moduleId || ""} />
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default ModuleDetail;
