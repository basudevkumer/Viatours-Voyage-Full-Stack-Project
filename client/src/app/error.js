"use client";

import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";

export default function GlobalError({ reset }) {
  return <main className="mx-auto flex min-h-[65vh] max-w-3xl items-center px-4 py-16"><ErrorState title="Something went wrong" text="Please try again. If the problem continues, return to the home page." action={<Button onClick={() => reset()}>Try again</Button>} /></main>;
}
