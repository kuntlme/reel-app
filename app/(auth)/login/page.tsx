"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
        return;
      } else {
        toast.success("Logged in successfully");
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-black/70 backdrop-blur-lg border border-white/10 text-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-center text-4xl sm:text-5xl font-bold pb-4 gradient-text">Sign In</h1>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm sm:text-base">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm sm:text-base">Password</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 py-2 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm sm:text-base text-gray-300">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push("/register")}
            className="text-purple-400 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
