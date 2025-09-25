'use client';

import { signIn } from "next-auth/react";
import { Github, Mail } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F4C5C] px-4">
      <div className="w-full max-w-md bg-[#1F2937] text-white rounded-2xl shadow-xl p-8 space-y-6">
     
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        <p className="text-center text-gray-300">Sign in to continue</p>

      
        <button
          onClick={() => signIn("github")}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#0F4C5C] hover:bg-[#0d3a45] rounded-xl transition-colors font-medium shadow"
        >
          <Github size={20} />
          Continue with GitHub
        </button>

       
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-[#0F4C5C] hover:bg-gray-100 rounded-xl transition-colors font-medium shadow"
        >
          <Mail size={20} />
          Continue with Google
        </button>
      </div>
    </main>
  );
}
