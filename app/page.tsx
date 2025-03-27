import React from "react";
import { ArrowRight, Bot, Calendar, FileText } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-white text-black font-sans min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-4 border-black">
        <div className="flex items-center space-x-2">
          <Bot className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Meet Buddy</h1>
        </div>
        <div className="space-x-4">
          <Link
            className="bg-white border-2 border-black px-4 py-2 font-bold hover:bg-yellow-100 active:bg-yellow-200 transition-colors"
            href={"/sign-in"}
          >
            Login
          </Link>
          <Link
            href={"/sign-up"}
            className="bg-black text-white border-2 border-black px-4 py-2 font-bold hover:bg-gray-800 active:bg-gray-900 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-black border-4 border-black p-4 bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              Transform Meetings into Actionable Insights
            </h2>
            <p className="text-xl border-2 border-black p-3 bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              Automatically summarize, track, and optimize your team&apos;s
              meetings with AI-powered intelligence.
            </p>
            <div className="flex space-x-4">
              <Link
                href={"/dashboard"}
                className="flex items-center bg-green-500 text-white border-4 border-black px-6 py-3 font-bold hover:bg-green-600 active:bg-green-700 shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all"
              >
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-blue-400 border-4 border-black absolute inset-0 -rotate-6 shadow-[10px_10px_0px_rgba(0,0,0,1)]"></div>
            <div className="relative bg-white border-4 border-black p-6 z-10 shadow-[12px_12px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center border-2 border-black p-2 bg-yellow-100">
                  <FileText className="mr-3" />
                  AI-Powered Meeting Summaries
                </li>
                <li className="flex items-center border-2 border-black p-2 bg-green-100">
                  <Calendar className="mr-3" />
                  Automatic Action Item Tracking
                </li>
                <li className="flex items-center border-2 border-black p-2 bg-pink-100">
                  <Bot className="mr-3" />
                  Seamless Google Calender Integration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black p-6 text-center">
        <p className="font-bold">
          © 2025 Meet Buddy. Revolutionizing Meeting Productivity.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
