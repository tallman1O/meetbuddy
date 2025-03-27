"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function TextSummarizer() {
  const [formData, setFormData] = useState({
    meeting_title: "", // Changed to match backend key
    date: "", // Changed to match backend key
    attendees: "",
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    summary?: string;
    timelines?: string[];
    calendar_events?: { task: string; deadline: string; event_link: string }[];
  }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        attendees: formData.attendees.split(",").join("\n"), // Convert to newline-separated format
      };

      const response = await axios.post(
        "http://localhost:5000/text-summary",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setSummaryData(response.data);
      setFormSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="w-1/2 p-8">
        <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-8 dark:bg-zinc-800">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Text Summarizer
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Enter the meeting details and text to generate a meaningful summary.
          </p>

          {error && (
            <div className="mt-4 text-red-500 text-sm">Error: {error}</div>
          )}

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="meeting_title">Meeting Title</Label>
              <Input
                id="meeting_title"
                placeholder="Enter meeting title"
                type="text"
                onChange={handleChange}
                value={formData.meeting_title}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="date">Meeting Date</Label>
              <Input
                id="date"
                type="date"
                onChange={handleChange}
                value={formData.date}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="attendees">Enter Attendee Names</Label>
              <textarea
                id="attendees"
                placeholder="Enter names separated by commas"
                className="w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-zinc-700"
                rows={3}
                onChange={handleChange}
                value={formData.attendees}
                required
              ></textarea>
            </LabelInputContainer>

            <LabelInputContainer className="mb-8">
              <Label htmlFor="text">Enter Meeting Text</Label>
              <textarea
                id="text"
                placeholder="Paste or type meeting text"
                className="w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-zinc-700"
                rows={6}
                onChange={handleChange}
                value={formData.text}
                required
              ></textarea>
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              Submit &rarr;
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 p-8">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-neutral-500 dark:text-neutral-400" />
              <p className="text-neutral-600 dark:text-neutral-300">
                Generating summary...
              </p>
            </div>
          </div>
        ) : formSubmitted && summaryData.summary ? (
          <Card className="w-full h-full overflow-y-auto">
            <CardHeader>
              <CardTitle>Meeting Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Summary
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {summaryData.summary}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Timelines
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-400">
                    {summaryData.timelines?.map((timeline, index) => (
                      <li key={index}>{timeline}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Calendar Events
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-400">
                    {summaryData.calendar_events?.map((event, index) => (
                      <li key={index}>
                        {event.task} - {event.deadline} -{" "}
                        <a
                          href={event.event_link}
                          className="text-blue-500 underline"
                        >
                          View Event
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-500 dark:text-neutral-400">
            Submit text to generate summary
          </div>
        )}
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
