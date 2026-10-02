import BuildYourDay from "@/sections/activities/BuildYourDay";
import DestinationCrossSell from "@/sections/activities/DestinationCrossSell";
import ExperienceCategories from "@/sections/activities/ExperienceCategories";
import ExperienceCollections from "@/sections/activities/ExperienceCollections";
import ExperienceDiscovery from "@/sections/activities/ExperienceDiscovery";
import ExperienceFAQ from "@/sections/activities/ExperienceFAQ";
import ExperiencesCTA from "@/sections/activities/ExperiencesCTA";
import ExperiencesHero from "@/sections/activities/ExperiencesHero";
import LocalExperiences from "@/sections/activities/LocalExperiences";
import PopularExperiences from "@/sections/activities/PopularExperiences";
import Reveal from "@/components/animation/Reveal";

const Activities = () => <Reveal as="main" className="bg-bg-grey" selector="main > section">
  <ExperiencesHero />
  <ExperienceCategories />
  <ExperienceDiscovery />
  <PopularExperiences />
  <ExperienceCollections />
  <DestinationCrossSell />
  <BuildYourDay />
  <LocalExperiences />
  <ExperienceFAQ />
  <ExperiencesCTA />
</Reveal>;

export default Activities;
