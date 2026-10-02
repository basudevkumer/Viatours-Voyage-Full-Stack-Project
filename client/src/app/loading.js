import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return <main aria-label="Loading page" className="mx-auto grid min-h-[60vh] max-w-6xl content-center gap-5 px-4 py-16"><Skeleton className="h-10 max-w-sm" /><Skeleton className="h-5 max-w-2xl" /><div className="mt-6 grid gap-5 sm:grid-cols-3"><Skeleton className="h-64" /><Skeleton className="h-64" /><Skeleton className="h-64" /></div></main>;
}
