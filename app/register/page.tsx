"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          password,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || "registration failed");
      }

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="bg-gray-200 text-black p-5 rounded-xl h-1/3 w-1/3 flex flex-col gap-5">
<form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
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
