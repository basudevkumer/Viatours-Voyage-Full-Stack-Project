import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return <main className="mx-auto flex min-h-[65vh] max-w-3xl items-center px-4 py-16"><EmptyState title="Page not found" text="We couldn't find the page you were looking for." action={<Button href="/">Return home</Button>} /></main>;
}
