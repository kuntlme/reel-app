import NavigationBar from "@/components/Navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="bg-black min-h-screen">
      <NavigationBar/>
      {children}
    </div>
  );
};

export default layout;
