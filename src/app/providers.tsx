"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function RotatingEngine() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <div className="relative">
        {/* Main engine body */}
        <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full animate-spin-slow shadow-2xl">
          {/* Engine bolts */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-gray-700 rounded-full"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-gray-700 rounded-full"></div>
          
          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-600"></div>
        </div>
        
        {/* Engine blades */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 animate-spin">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-gray-600 to-gray-400 rounded-full"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 w-20 bg-gradient-to-l from-gray-600 to-gray-400 rounded-full"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 w-20 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"></div>
          
          {/* Diagonal blades */}
          <div className="absolute top-3 left-3 w-1 h-14 bg-gradient-to-br from-gray-600 to-gray-400 rounded-full transform rotate-45 origin-bottom"></div>
          <div className="absolute top-3 right-3 w-1 h-14 bg-gradient-to-bl from-gray-600 to-gray-400 rounded-full transform -rotate-45 origin-bottom"></div>
          <div className="absolute bottom-3 left-3 w-1 h-14 bg-gradient-to-tr from-gray-600 to-gray-400 rounded-full transform -rotate-45 origin-top"></div>
          <div className="absolute bottom-3 right-3 w-1 h-14 bg-gradient-to-tl from-gray-600 to-gray-400 rounded-full transform rotate-45 origin-top"></div>
        </div>
      </div>
    </div>
  );
}

function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  // Don't protect the signin page
  if (pathname === '/signin') {
    return <>{children}</>;
  }
  
  if (status === "loading") {
    return (
      <main className="min-h-screen flex flex-col gap-4 items-center justify-center bg-[#0F4C5C] relative overflow-hidden">
        <h1 className="text-3xl font-bold text-white">Welcome to the Do It App</h1>
        <RotatingEngine />
        <div className="w-full max-w-md bg-[#1F2937] text-white rounded-2xl shadow-xl p-8 space-y-6 relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-pulse">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <h1 className="text-xl font-medium">Starting cause you can do it...</h1>
            <p className="text-gray-300 text-center">Checking your authentication</p>
          </div>
        </div>
      </main>
    );
  }
  
  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0F4C5C] px-4">
        <div className="w-full max-w-md bg-[#1F2937] text-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Authentication Required</h1>
            <p className="text-gray-300">Please sign in to access this page</p>
            <button
              onClick={() => window.location.href = '/signin'}
              className="w-full py-3 px-4 bg-[#0F4C5C] hover:bg-[#0d3a45] rounded-xl transition-colors font-medium shadow"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </main>
    );
  }
  
  return <>{children}</>;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthGuard>{children}</AuthGuard>
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </SessionProvider>
  );
}