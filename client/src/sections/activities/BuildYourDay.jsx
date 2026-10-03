"use client";

import { useMemo } from "react";
import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import useDayPlanner from "@/hooks/useDayPlanner";
import { experiences } from "./data";
import {
  FiSun,
  FiMoon,
  FiCoffee,
  FiCheck,
  FiPlus,
  FiX,
  FiArrowRight,
  FiCalendar,
} from "react-icons/fi";
import { cn } from "@/lib/cn";

const plannerDestinations = [
  "Paris",
  "Rome",
  "Bali",
  "Tokyo",
  "London",
  "Dubai",
  "Santorini",
  "Cappadocia",
];

export default function BuildYourDay() {
  const {
    destination,
    setDestination,
    morningExp,
    afternoonExp,
    eveningExp,
    selectedCount,
    totalPrice,
    selectExperience,
    removeExperience,
    clearPlan,
  } = useDayPlanner();

  // Find candidate experiences for each time slot in this destination
  const destExperiences = useMemo(() => {
    return experiences.filter(
      (e) =>
        e.destination.toLowerCase() === destination.toLowerCase() ||
        e.location.toLowerCase().includes(destination.toLowerCase())
    );
  }, [destination]);

  const morningCandidates = useMemo(() => {
    const list = destExperiences.filter((e) => e.timeOfDay === "morning");
    return list.length ? list : experiences.filter((e) => e.timeOfDay === "morning").slice(0, 2);
  }, [destExperiences]);

  const afternoonCandidates = useMemo(() => {
    const list = destExperiences.filter((e) => e.timeOfDay === "afternoon" || e.timeOfDay === "full-day");
    return list.length ? list : experiences.filter((e) => e.timeOfDay === "afternoon").slice(0, 2);
  }, [destExperiences]);

  const eveningCandidates = useMemo(() => {
    const list = destExperiences.filter((e) => e.timeOfDay === "evening");
    return list.length ? list : experiences.filter((e) => e.timeOfDay === "evening").slice(0, 2);
  }, [destExperiences]);

  const slots = [
    {
      slotKey: "morning",
      label: "Morning (09:00 - 12:30)",
      icon: FiCoffee,
      candidates: morningCandidates,
      selected: morningExp,
    },
    {
      slotKey: "afternoon",
      label: "Afternoon (13:30 - 17:00)",
      icon: FiSun,
      candidates: afternoonCandidates,
      selected: afternoonExp,
    },
    {
      slotKey: "evening",
      label: "Evening (18:00 - 21:30)",
      icon: FiMoon,
      candidates: eveningCandidates,
      selected: eveningExp,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white" id="build-your-day">
      <Container>
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            align="center"
            eyebrow="INTERACTIVE DAY BUILDER"
            title="Build your perfect day, moment by moment"
            text="Pick a destination, shortlist your morning, afternoon, and evening experiences, and calculate an estimated schedule. Zero obligation."
            className="mb-8"
          />

          {/* Destination Selector Tabs */}
          <div className="mb-8 flex flex-col items-center">
            <label htmlFor="planner-destination-select" className="caption font-medium text-text-secondary mb-2">
              Select destination for your day plan:
            </label>
            <div
              id="planner-destination-select"
              className="flex flex-wrap justify-center gap-2"
              role="tablist"
              aria-label="Select destination for day planner"
            >
              {plannerDestinations.map((city) => {
                const isActive = city === destination;
                return (
                  <button
                    key={city}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setDestination(city)}
                    className={cn(
                      "body4 rounded-full px-4 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive
                        ? "bg-accent text-white shadow-xs font-semibold"
                        : "border border-gray5 bg-white text-dark hover:border-accent"
                    )}
                    data-analytics-id={`dayplanner-dest-${city.toLowerCase()}`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Day Slots Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {slots.map((slot) => {
              const Icon = slot.icon;
              return (
                <div
                  key={slot.slotKey}
                  className="flex flex-col rounded-2xl border border-gray6 bg-gray7/30 p-5"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-gray6 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Icon aria-hidden="true" size={16} />
                      </span>
                      <h3 className="title4 font-bold text-dark">{slot.label}</h3>
                    </div>
                    {slot.selected && (
                      <span className="caption flex items-center gap-1 font-semibold text-success">
                        <FiCheck aria-hidden="true" /> Picked
                      </span>
                    )}
                  </div>

                  {/* Candidate Experiences for this slot */}
                  <div className="space-y-3 flex-1">
                    {slot.candidates.map((cand) => {
                      const isChosen = slot.selected?.id === cand.id;
                      return (
                        <div
                          key={cand.id}
                          className={cn(
                            "group flex flex-col justify-between rounded-xl border p-3 transition-all",
                            isChosen
                              ? "border-accent bg-accent/5 shadow-xs"
                              : "border-gray6 bg-white hover:border-gray5"
                          )}
                        >
                          <div className="flex gap-3">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray5">
                              <Image
                                src={cand.image}
                                alt={cand.title}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="title4 text-xs font-semibold text-dark line-clamp-2">
                                {cand.title}
                              </p>
                              <div className="mt-1 flex items-center justify-between">
                                <span className="caption text-text-secondary">{cand.duration}</span>
                                <span className="caption font-bold text-accent">${cand.price}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => selectExperience(slot.slotKey, cand.id)}
                            className={cn(
                              "mt-2.5 flex items-center justify-center gap-1 rounded-lg py-1.5 caption font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                              isChosen
                                ? "bg-accent text-white"
                                : "border border-gray5 bg-white text-dark hover:border-accent hover:text-accent"
                            )}
                            data-analytics-id={`dayplanner-select-${cand.id}`}
                          >
                            {isChosen ? (
                              <>
                                <FiCheck size={14} aria-hidden="true" /> Shortlisted
                              </>
                            ) : (
                              <>
                                <FiPlus size={14} aria-hidden="true" /> Add to {slot.slotKey}
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shortlist Summary Strip */}
          <div className="mt-8 rounded-2xl border border-gray6 bg-dark p-6 text-white sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="caption mb-1 inline-block uppercase tracking-wider text-accent font-semibold">
                  ESTIMATED DAY TOTAL ({destination})
                </span>
                <div className="flex items-baseline gap-3">
                  <h4 className="heading text-white">${totalPrice.toFixed(2)}</h4>
                  <span className="caption text-white/70">per traveler ({selectedCount} of 3 moments shortlisted)</span>
                </div>
                <p className="body5 text-white/80 mt-1">
                  {selectedCount === 0
                    ? "Select morning, afternoon, or evening activities above to draft your day."
                    : selectedCount === 3
                    ? "Full 3-part day planned! Our team can confirm guide availability across all slots."
                    : "Add more slots above or submit your current plan to our coordinators."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {selectedCount > 0 && (
                  <button
                    type="button"
                    onClick={clearPlan}
                    className="caption text-white/60 hover:text-white underline px-2 py-1"
                    data-analytics-id="dayplanner-clear"
                  >
                    Reset plan
                  </button>
                )}

                {selectedCount > 0 ? (
                  <Button
                    href="#day-plan-inquiry"
                    variant="primary"
                    size="md"
                    data-analytics-id="dayplanner-submit-plan"
                    rightIcon={<FiArrowRight aria-hidden="true" />}
                  >
                    Send my day plan to our team
                  </Button>
                ) : (
                  <Button
                    href="#discover"
                    variant="secondary"
                    size="md"
                    data-analytics-id="dayplanner-explore-cta"
                    rightIcon={<FiArrowRight aria-hidden="true" />}
                  >
                    Explore experiences
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
