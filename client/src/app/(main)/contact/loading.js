import Skeleton from "@/components/ui/Skeleton";
import Container from "@/components/shared/Container";

export default function ContactLoading() {
  return (
    <main aria-label="Loading contact page" className="min-h-screen bg-bg-field">
      {/* Hero skeleton */}
      <div className="bg-dark pb-16 pt-36 text-white sm:pt-40">
        <Container>
          <div className="space-y-4">
            <Skeleton className="h-4 w-32 bg-white/20" />
            <Skeleton className="h-12 w-3/4 max-w-lg bg-white/20 sm:h-14" />
            <Skeleton className="h-6 w-full max-w-xl bg-white/15" />
          </div>
        </Container>
      </div>

      {/* Hub skeleton */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-6xl space-y-8">
            {/* Intent selector skeleton */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-xl bg-white" />
              ))}
            </div>

            {/* Form + Sidebar skeleton */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="rounded-2xl border border-gray6 bg-white p-6 sm:p-10 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Skeleton className="h-14 rounded-xl" />
                  <Skeleton className="h-14 rounded-xl" />
                  <Skeleton className="h-14 rounded-xl" />
                  <Skeleton className="h-14 rounded-xl" />
                </div>
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-11 w-48 rounded-xl" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-72 rounded-2xl bg-white" />
                <Skeleton className="h-24 rounded-2xl bg-white" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
