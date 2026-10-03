import Skeleton from "@/components/ui/Skeleton";

export default function GuideDetailLoading() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-8">
      {/* Breadcrumb Skeleton */}
      <Skeleton className="mb-4 h-6 w-72 rounded-lg" />

      {/* Header Skeleton */}
      <div className="mb-8 space-y-4 max-w-4xl">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-12 w-3/4 rounded-xl" />
        <Skeleton className="h-6 w-full rounded-lg" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <Skeleton className="mb-10 h-[380px] sm:h-[480px] w-full rounded-2xl" />

      {/* Two-Column Grid */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/2 rounded-lg" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-8 w-2/5 rounded-lg" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
