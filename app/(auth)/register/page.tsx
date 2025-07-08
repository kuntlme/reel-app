"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilename, setProfilename] = useState("");
  const [username, setUsername] = useState("");
  const [joining_date, setJoining_date] = useState("")
  const [location, setLocation] = useState("")

  // cosnt []
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }

    try {
      // react query
      // loading, error, debounce
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          profilename,
          username,
          password,
          joining_date,
          location
        }),
      });

      if (!res.ok) {
        throw new Error("registration failed");
      }

      const data = await res.json();

      console.log(data);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="bg-gray-200 text-black p-5 rounded-xl h-1/3 w-1/3 flex flex-col gap-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h1 className="text-center text-5xl font-bold pb-5">Signup</h1>

          <label htmlFor="email" className="text-center">
            {" "}
            Email{" "}
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="bg-white rounded-2xl px-2 py-1 text-center"
          />

          <label htmlFor="profilename" className="text-center">
            {" "}
            Profile Name{" "}
          </label>
          <input
            id="profilename"
            value={profilename}
            onChange={(e) => setProfilename(e.target.value)}
            type="text"
            className="bg-white rounded-2xl px-2 py-1 text-center"
          />

          <label htmlFor="username" className="text-center">
            {" "}
            Username{" "}
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="bg-white rounded-2xl px-2 py-1 text-center"
          />

          <label htmlFor="joining_date" className="text-center">
            {" "}
            Profile Name{" "}
          </label>
          <input
            id="joining_date"
            value={joining_date}
            onChange={(e) => setJoining_date(e.target.value)}
            type="date"
            className="bg-white rounded-2xl px-2 py-1 text-center"
          />

          <label htmlFor="location" className="text-center">
            {" "}
            Location{" "}
          </label>
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            className="bg-white rounded-2xl px-2 py-1 text-center"
          />

          <label htmlFor="password" className="text-center">
            {" "}
            password{" "}
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="bg-white rounded-2xl px-2 py-1 text-center"
          />

          <label htmlFor="confirmPassword" className="text-center">
            {" "}
            Confirm password{" "}
          </label>
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            className="bg-white rounded-2xl px-2 py-1 text-center"
          />

          <button className="text-white font-semibold p-2 bg-black rounded-xl mt-5">
            Signup
          </button>
        </form>
        <div className="text-center">
          Already have an account ?
          <button onClick={() => router.push("/login")}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
