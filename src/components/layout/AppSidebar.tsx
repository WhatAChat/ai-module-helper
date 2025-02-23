
import {
  BookOpen,
  Home,
  Users,
  Settings,
  GraduationCap,
  FileEdit,
  UserCheck,
  School
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Profile {
  id: string;
  role: "GUEST" | "STUDENT" | "PROFESSOR" | "ADMIN";
  email: string;
}

const studentMenuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "My Modules", icon: BookOpen, url: "/modules" },
  { title: "My Progress", icon: GraduationCap, url: "/progress" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const professorMenuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Manage Modules", icon: BookOpen, url: "/modules" },
  { title: "Students", icon: Users, url: "/students" },
  { title: "Create Content", icon: FileEdit, url: "/create" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const adminMenuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Modules", icon: BookOpen, url: "/modules" },
  { title: "Users", icon: Users, url: "/users" },
  { title: "Approvals", icon: UserCheck, url: "/approvals" },
  { title: "Institutions", icon: School, url: "/institutions" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profile);
      }
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!profile || profile.role === "GUEST") {
    return null;
  }

  const getMenuItems = () => {
    switch (profile.role) {
      case "STUDENT":
        return studentMenuItems;
      case "PROFESSOR":
        return professorMenuItems;
      case "ADMIN":
        return adminMenuItems;
      default:
        return [];
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-3 py-4">
          <h2 className="text-lg font-semibold text-primary">Learning Hub</h2>
          <p className="text-sm text-muted-foreground capitalize">{profile.role.toLowerCase()}</p>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.url}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
