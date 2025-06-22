"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      // react query
      // loading, error, debounce
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.log(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <div className="bg-gray-200 text-black p-5 rounded-xl h-1/3 w-1/3 flex flex-col gap-5">
<form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <h1 className="text-center text-5xl font-bold pb-5">Signin</h1>
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
        <button className="text-white font-semibold p-2 bg-black rounded-xl mt-5">
          Signin
        </button>
      </form>
      <div className="text-center">
        Don{`&apos`}t have an account ? 
        <button onClick={() => router.push("/register")}> Register</button>
      </div>
      </div>
      
      
    </div>
  );
}

export default LoginPage;
