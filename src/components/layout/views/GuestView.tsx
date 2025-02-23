
import { Loader2 } from "lucide-react";

export function GuestView() {
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
