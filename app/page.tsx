"use client";
import Landing from "@/components/Landing";
import Main from "@/components/Main";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  return <div>{!!session ? <Main /> : <Landing />}</div>;
}
