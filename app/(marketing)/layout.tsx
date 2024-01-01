"use client";
import React from "react";
import Navbar from "./_components/navbar";

const MarcketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1F1f1f]">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default MarcketingLayout;
