
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ModuleCardProps {
  title: string;
  description: string;
  progress?: number;
}

export function ModuleCard({ title, description, progress = 0 }: ModuleCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover-card cursor-pointer"
      onClick={() => navigate(`/module/${encodeURIComponent(title)}`)}
    >
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {progress > 0 && (
          <div className="mt-4">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {progress}% Complete
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
