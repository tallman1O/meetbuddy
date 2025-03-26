"use client";

import React from "react";
import SidebarDemo from "@/components/sidebarDemo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SidebarDemo />
      <main className="flex-grow overflow-auto p-4 bg-white">{children}</main>
    </div>
  );
}
