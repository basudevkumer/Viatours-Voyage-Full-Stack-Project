import Skeleton from "@/components/ui/Skeleton";

export default function TourDetailLoading() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-8">
      {/* Breadcrumb Skeleton */}
      <Skeleton className="mb-4 h-6 w-72 rounded-lg" />

      {/* Title Block Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-10 w-3/4 max-w-2xl rounded-xl" />
        <Skeleton className="h-5 w-48 rounded-lg" />
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Left Column Skeletons */}
        <div className="space-y-8">
          <Skeleton className="h-[420px] w-full rounded-2xl" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-48 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
        </div>

        {/* Right Column (Booking Widget) */}
        <div>
          <Skeleton className="h-[480px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
