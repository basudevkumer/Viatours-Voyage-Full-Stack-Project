"use client";

import { useMemo } from "react";
import { destinationsData } from "@/sections/destinations/data";

export default function useDestinationMatch({ budget, travelStyle, month }) {
  const matches = useMemo(() => {
    const scored = destinationsData.map((dest) => {
      let score = 0;

      // Style scoring
      if (travelStyle && travelStyle !== "any") {
        if (dest.travelStyles.some((s) => s.toLowerCase() === travelStyle.toLowerCase())) {
          score += 3;
        }
      }

      // Seasonal scoring
      if (month && month !== "any") {
        if (dest.bestMonths.some((m) => m.toLowerCase() === month.toLowerCase())) {
          score += 2;
        }
      }

      // Budget scoring
      if (budget && budget !== "any") {
        if (budget === "value" && dest.startingPrice <= 100) {
          score += 2;
        } else if (budget === "moderate" && dest.startingPrice > 50 && dest.startingPrice <= 250) {
          score += 2;
        } else if (budget === "luxury" && (dest.startingPrice > 200 || dest.travelStyles.includes("Luxury"))) {
          score += 2;
        }
      }

      return { dest, score };
    });

    // Sort by highest score first, then by tour catalog breadth
    scored.sort((a, b) => b.score - a.score || b.dest.toursCount - a.dest.toursCount);

    return scored.slice(0, 3).map((item) => item.dest);
  }, [budget, travelStyle, month]);

  return matches;
}
