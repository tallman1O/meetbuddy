"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SignupFormDemo() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Video Summarizer
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Enter the meeting details and the video file to summarize the meeting
        into a few sentences.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* Meeting Title */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="meetingTitle">Meeting Title</Label>
          <Input
            id="meetingTitle"
            placeholder="Enter meeting title"
            type="text"
          />
        </LabelInputContainer>

        {/* Meeting Date */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="meetingDate">Meeting Date</Label>
          <Input id="meetingDate" type="date" />
        </LabelInputContainer>

        {/* Attendee Names */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="attendees">Enter Attendee Names</Label>
          <textarea
            id="attendees"
            placeholder="Enter names separated by commas"
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm dark:border-gray-600 dark:bg-zinc-800"
            rows={3}
          ></textarea>
        </LabelInputContainer>

        {/* File Upload */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor="fileUpload">Upload File</Label>
          <Input
            id="fileUpload"
            type="file"
            accept=".mp4, .mov, .avi, .mkv, .mpeg4"
          />
        </LabelInputContainer>

        {/* Submit Button */}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Submit &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

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
