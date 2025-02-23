
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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

// Guest View - Pending Approval Screen
function GuestView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Access Pending</h2>
          <p className="mt-2 text-gray-600">
            Your account is currently pending approval. Once approved, you'll have access to the learning platform.
          </p>
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 text-primary">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Awaiting approval</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Student View - Access to Learning Content
function StudentView({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

// Professor View - Content Management + Teaching Tools
function ProfessorView({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

// Admin View - Full System Management
function AdminView({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
