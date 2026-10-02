import { cn } from "@/lib/cn";

export default function AuthCard({ children, className }) {
  return <main className="flex min-h-screen items-center justify-center bg-bg-grey px-4 py-12"><div className={cn("w-full max-w-md rounded-2xl border border-gray6 bg-white p-6 shadow-sm sm:p-8", className)}>{children}</div></main>;
}
