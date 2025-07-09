"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilename, setProfilename] = useState("");
  const [username, setUsername] = useState("");
  const [joining_date, setJoining_date] = useState("");
  const [location, setLocation] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          profilename,
          username,
          password,
          joining_date,
          location
        }),
      });

      if (!res.ok) throw new Error("Registration failed");
      await res.json();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-black/70 backdrop-blur-lg border border-white/10 text-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-center text-4xl sm:text-5xl font-bold pb-4 gradient-text">Sign Up</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm sm:text-base">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="profilename" className="mb-1 text-sm sm:text-base">Profile Name</label>
              <input
                id="profilename"
                type="text"
                value={profilename}
                onChange={(e) => setProfilename(e.target.value)}
                className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="username" className="mb-1 text-sm sm:text-base">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="yourusername"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="joining_date" className="mb-1 text-sm sm:text-base">Joining Date</label>
              <input
                id="joining_date"
                type="date"
                value={joining_date}
                onChange={(e) => setJoining_date(e.target.value)}
                className="bg-gray-800/60 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
              />
            </div>

            <div className="flex flex-col sm:col-span-2">
              <label htmlFor="location" className="mb-1 text-sm sm:text-base">Location</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your City"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm sm:text-base">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="mb-1 text-sm sm:text-base">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800/60 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 py-2 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm sm:text-base text-gray-300">
          Already have an account?{' '}
          <button
            onClick={() => router.push("/login")}
            className="text-purple-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
