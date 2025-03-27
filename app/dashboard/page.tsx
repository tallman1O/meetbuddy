"use client";
import React, { useEffect, useState } from "react";

interface Summary {
  _id: string;
  meeting_title: string;
  meeting_date: string;
  summary: string;
}

function Dashboard() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/summaries")
      .then((response) => response.json())
      .then((data) => {
        setSummaries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching summaries:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Meeting Summaries Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Explore your past meeting summaries in one place.
          </p>
        </header>

        {/* Main Content */}
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-lg text-gray-700">Loading summaries...</p>
          </div>
        ) : summaries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-5 text-left">Meeting Title</th>
                  <th className="py-3 px-5 text-left">Date</th>
                  <th className="py-3 px-5 text-left">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {summaries.map((summary) => (
                  <tr
                    key={summary._id}
                    className="hover:bg-gray-100 transition duration-150"
                  >
                    <td className="py-4 px-5">{summary.meeting_title}</td>
                    <td className="py-4 px-5">{summary.meeting_date}</td>
                    <td className="py-4 px-5">
                      <div className="text-sm text-gray-700 line-clamp-3">
                        {summary.summary}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-600">No summaries available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
