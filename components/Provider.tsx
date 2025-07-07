"use client";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
// const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {
  //     const authenticator = async () => {
  //         try {
  //             const response = await fetch("/api/imagekit-auth");

  //             if (!response.ok) {
  //                 const errorText = await response.text();
  //                 throw new Error(`Request failed with status ${response.status}: ${errorText}`);
  //             }

  //             const data = await response.json();
  //             const { signature, expire, token } = data;
  //             return { signature, expire, token };
  //         } catch (error) {
  //             throw new Error(`Authentication request failed: ${error}`);
  //         }
  //     };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <SessionProvider refetchInterval={5 * 60}>
        <ImageKitProvider urlEndpoint={urlEndpoint}>
          {children}
          <Toaster richColors position="top-right"/>
        </ImageKitProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
