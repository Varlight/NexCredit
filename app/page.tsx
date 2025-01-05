"use client";

import { CreditScore } from "@/components/dashboard/CreditScore";
import { FileUpload } from "@/components/dashboard/FileUpload";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function Home() {
  const [analysisStatus, setAnalysisStatus] = useState<
    "idle" | "processing" | "complete"
  >("idle");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-8 text-4xl font-bold tracking-tight">
              Credit Risk Assessment
            </h1>
            
            <div className="grid gap-6">
              <FileUpload
                onStatusChange={setAnalysisStatus}
              />
              
              {analysisStatus === "complete" && (
                <CreditScore />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}