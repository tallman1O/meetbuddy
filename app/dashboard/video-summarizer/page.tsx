"use client";
import React, { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function VideoSummarizer() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    summary?: string;
    timelines?: string[];
    calendar_events?: { task: string; deadline: string; event_link: string }[];
  }>({});
  const [formData, setFormData] = useState({
    meetingTitle: "",
    meetingDate: "",
    attendees: "",
    file: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formDataUpload = new FormData();
    formDataUpload.append("meeting_title", formData.meetingTitle);
    formDataUpload.append("date", formData.meetingDate);
    formDataUpload.append("attendees", formData.attendees);
    if (formData.file) {
      formDataUpload.append("file", formData.file);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/video-summary", // Backend API endpoint
        formDataUpload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSummaryData(response.data);
      setFormSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;
      setFormData((prev) => ({ ...prev, file }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
      <div className="w-1/2 p-8">
        <div className="shadow-input mx-auto w-full max-w-md rounded-2xl bg-white p-8 dark:bg-zinc-800">
          <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
            Video Summarizer
          </h2>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
            Upload your video file and get a concise summary of the meeting.
          </p>

          {error && (
            <div className="mt-4 text-red-500 text-sm">Error: {error}</div>
          )}

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="meetingTitle">Meeting Title</Label>
              <Input
                id="meetingTitle"
                placeholder="Enter meeting title"
                type="text"
                onChange={handleInputChange}
                value={formData.meetingTitle}
                required
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="meetingDate">Meeting Date</Label>
              <Input
                id="meetingDate"
                type="date"
                onChange={handleInputChange}
                value={formData.meetingDate}
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
                onChange={handleInputChange}
                value={formData.attendees}
                required
              ></textarea>
            </LabelInputContainer>

            <LabelInputContainer className="mb-8">
              <Label htmlFor="fileUpload">Upload Video</Label>
              <Input
                id="fileUpload"
                type="file"
                accept=".mp4,.mov,.avi,.mkv,.mpeg4"
                onChange={handleInputChange}
                required
              />
            </LabelInputContainer>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
              type="submit"
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 p-8">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-neutral-500 dark:text-neutral-400" />
            <p className="text-neutral-600 dark:text-neutral-300">
              Generating summary...
            </p>
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
                  <ul className="list-disc list-inside text-sm text-neutral-600 dark:text-neutral-400">
                    {summaryData.timelines?.map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-500 dark:text-neutral-400">
            Submit a file to generate summary
          </div>
        )}
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
