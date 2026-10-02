import PageHeader from "@/components/layout/PageHeader";
import BookingWidget from "@/components/shared/BookingWidget";
import ImageGallery from "@/components/shared/ImageGallery";
import InclusionsList from "@/components/shared/InclusionsList";
import Itinerary from "@/components/shared/Itinerary";
import MapEmbed from "@/components/shared/MapEmbed";
import PolicyBlock from "@/components/shared/PolicyBlock";
import ShareButton from "@/components/shared/ShareButton";
import SectionHeading from "@/components/shared/SectionHeading";

export default function DetailPageContent({ item, itemType = "tour" }) {
  const isExperience = itemType === "experience";
  const listingPath = isExperience ? "/activities" : "/tours";
  const included = item.inclusions || item.features || [];
  const images = (item.gallery?.length ? item.gallery : [item.image]).map((src, index) => ({ src, alt: item.imageAlts?.[index] || `${item.title} in ${item.location}` }));
  return <>
    <PageHeader title={item.title} breadcrumbs={[{ label: "Home", href: "/" }, { label: isExperience ? "Experiences" : "Tours", href: listingPath }, { label: item.title }]} className="pb-6" />
    <main className="mx-auto grid max-w-[1320px] gap-8 px-4 pb-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:pb-16">
      <div className="min-w-0">
        <div className="mb-5 flex items-start justify-between gap-4"><div><p className="caption text-accent">{item.category || (isExperience ? "Experience" : "Tour")}</p><p className="body4 mt-2 text-text-secondary">{item.location}{item.duration ? ` · ${item.duration}` : item.days ? ` · ${item.days} days` : ""}</p></div><ShareButton title={item.title} /></div>
        <ImageGallery images={images} title={`${item.title} photos`} />
        {item.description && <section className="mt-8"><SectionHeading title="About this experience" text={item.description} className="mb-0" /></section>}
        <div className="mt-8 grid gap-5"><InclusionsList included={included} excluded={item.exclusions || []} /><Itinerary days={item.itinerary || []} /><PolicyBlock cancellation={item.cancellationPolicy} meetingPoint={item.meetingPoint} whatToBring={item.whatToBring} /></div>
        {item.location && <section className="mt-8"><h2 className="title1 mb-4 text-dark">Location</h2><MapEmbed location={item.location} /></section>}
      </div>
      <BookingWidget itemId={item.id} itemType={itemType} price={item.price} cancellation={item.cancellationPolicy} />
    </main>
  </>;
}
