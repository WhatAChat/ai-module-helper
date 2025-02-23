
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { GuestView } from "./views/GuestView";
import { StudentView } from "./views/StudentView";
import { ProfessorView } from "./views/ProfessorView";
import { AdminView } from "./views/AdminView";

interface Profile {
  id: string;
  role: "GUEST" | "STUDENT" | "PROFESSOR" | "ADMIN";
  email: string;
}

interface RoleBasedLayoutProps {
  children: React.ReactNode;
}

export function RoleBasedLayout({ children }: RoleBasedLayoutProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {profile.role === "GUEST" && <GuestView />}
      {profile.role === "STUDENT" && <StudentView>{children}</StudentView>}
      {profile.role === "PROFESSOR" && <ProfessorView>{children}</ProfessorView>}
      {profile.role === "ADMIN" && <AdminView>{children}</AdminView>}
    </div>
  );
}
