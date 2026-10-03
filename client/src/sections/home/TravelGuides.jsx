import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import Button from "@/components/ui/Button";
import allImages from "@/components/helper/imageProvider";
import { FiArrowRight } from "react-icons/fi";

export default function TravelGuides() {
  const articles = (allImages.traveItems || []).slice(0, 3);

  return (
    <Section bg="grey" spacing="md" id="travel-guides">
      <SectionHeading
        eyebrow="DESTINATION INSIGHTS & ADVICE"
        title="Stories & guides from the trail"
        text="Practical itineraries, culinary recommendations, and cultural notes to inspire your next exploration."
        action={
          <Button
            href="/travel-guide"
            variant="outline"
            size="sm"
            data-analytics-id="travel-guides-view-all"
            rightIcon={<FiArrowRight aria-hidden="true" />}
          >
            Read all guides
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => (
          <BlogCard
            key={item.id}
            image={item.image}
            category={item.category}
            date={item.date}
            author={item.author}
            title={item.title}
            excerpt="Discover hidden viewpoints, seasonal timing, and practical advice curated by local specialists."
            href={`/travel-guide/${item.id}`}
            className="border border-gray6 shadow-xs"
          />
        ))}
      </div>
    </Section>
  );
}
