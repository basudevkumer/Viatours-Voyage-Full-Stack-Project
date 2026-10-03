import Section from "@/components/shared/Section";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import Button from "@/components/ui/Button";
import allImages from "@/components/helper/imageProvider";
import { FiArrowRight } from "react-icons/fi";

export default function DestinationTravelGuides() {
  const articles = (allImages.traveItems || []).slice(0, 3);

  return (
    <Section bg="white" spacing="md" id="travel-guides">
      <SectionHeading
        eyebrow="DESTINATION GUIDES & INSIGHTS"
        title="Essential reading before you fly"
        text="Practical itineraries, cultural etiquette, transit tips, and local food recommendations curated by our team."
        action={
          <Button
            href="/travel-guide"
            variant="outline"
            size="sm"
            data-analytics-id="destination-read-all-guides"
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
            category={item.category || "Travel Guide"}
            date={item.date}
            author={item.author}
            title={item.title}
            excerpt="Discover hidden viewpoints, seasonal climate tips, and authentic experiences verified on the ground."
            href={`/travel-guide/${item.id}`}
            className="border border-gray6 shadow-xs"
          />
        ))}
      </div>
    </Section>
  );
}
