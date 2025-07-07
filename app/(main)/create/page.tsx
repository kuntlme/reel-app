"use client"
import dynamic from "next/dynamic";
import React from "react";

const DynamicCreateVideo = dynamic(() => import("@/components/CreateVideo"), {ssr: false});

export default function Page() {
  return (
    <div>
      <DynamicCreateVideo />
    </div>
  );
}
