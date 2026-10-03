import Skeleton from "@/components/ui/Skeleton";
import Container from "@/components/shared/Container";

export default function AboutLoading() {
  return (
    <main aria-label="Loading about page" className="min-h-screen bg-bg-grey">
      {/* Hero skeleton */}
      <div className="bg-dark pb-16 pt-36 text-white sm:pt-40">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div className="space-y-4">
              <Skeleton className="h-4 w-40 bg-white/20" />
              <Skeleton className="h-12 w-3/4 bg-white/20 sm:h-16" />
              <Skeleton className="h-6 w-full max-w-xl bg-white/15" />
              <Skeleton className="h-6 w-2/3 bg-white/15" />
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-40 rounded-xl bg-white/25" />
                <Skeleton className="h-12 w-40 rounded-xl bg-white/15" />
              </div>
            </div>
            <Skeleton className="hidden h-72 w-full rounded-3xl bg-white/15 lg:block" />
          </div>
        </Container>
      </div>

      {/* Pillars skeleton */}
      <div className="bg-white py-16">
        <Container>
          <Skeleton className="mb-8 h-10 w-64 rounded-xl" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 rounded-2xl border border-gray6 p-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="mt-4 flex items-center justify-between pt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </main>
  );
}
