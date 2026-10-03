import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import Button from "@/components/ui/Button";
import allImages from "@/components/helper/imageProvider";
import { FiArrowRight } from "react-icons/fi";

export default function TravelInspiration() {
  const articles = (allImages.traveItems || []).slice(0, 3);

  return (
    <section className="bg-white py-14 sm:py-20" id="inspiration">
      <Container>
        <SectionHeading
          eyebrow="ON THE TRAIL"
          title="Stories & practical guides for your journey"
          text="Transit tips, packing recommendations, and cultural notes written by guides and experienced travelers."
          action={
            <Button
              href="/travel-guide"
              variant="outline"
              size="sm"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              data-analytics-id="tours-read-all-guides"
            >
              Explore travel guides
            </Button>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <BlogCard
              key={item.id}
              image={item.image}
              category={item.category || "Touring Advice"}
              date={item.date}
              author={item.author}
              title={item.title}
              excerpt="Discover insider pacing advice, packing essentials, and cultural etiquette verified by local guides."
              href={`/travel-guide/${item.id}`}
              className="border border-gray6 shadow-xs"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
