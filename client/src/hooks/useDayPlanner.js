"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { experiences } from "@/sections/activities/data";

const STORAGE_KEY = "viatours_day_planner_v1";

const defaultPlan = {
  destination: "Paris",
  morningId: null,
  afternoonId: null,
  eveningId: null,
};

let cachedPlan = defaultPlan;
let loaded = false;
const subscribers = new Set();

function readPlan() {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          cachedPlan = { ...defaultPlan, ...parsed };
        }
      }
    } catch {
      // Storage disabled
    }
  }
  return cachedPlan;
}

function subscribe(callback) {
  subscribers.add(callback);
  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY) return;
    loaded = false;
    readPlan();
    subscribers.forEach((notify) => notify());
  };
  window.addEventListener("storage", onStorage);
  return () => {
    subscribers.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function updatePlan(updater) {
  const current = readPlan();
  const next = typeof updater === "function" ? updater(current) : updater;
  cachedPlan = { ...current, ...next };
  loaded = true;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cachedPlan));
    }
  } catch {
    // Ignore
  }
  subscribers.forEach((notify) => notify());
}

const getServerSnapshot = () => defaultPlan;

export default function useDayPlanner() {
  const plan = useSyncExternalStore(subscribe, readPlan, getServerSnapshot);

  const setDestination = useCallback((dest) => {
    updatePlan({
      destination: dest,
      morningId: null,
      afternoonId: null,
      eveningId: null,
    });
  }, []);

  const selectExperience = useCallback((slot, expId) => {
    updatePlan((prev) => ({
      ...prev,
      [`${slot}Id`]: prev[`${slot}Id`] === expId ? null : expId,
    }));
  }, []);

  const removeExperience = useCallback((slot) => {
    updatePlan({ [`${slot}Id`]: null });
  }, []);

  const clearPlan = useCallback(() => {
    updatePlan((prev) => ({
      ...prev,
      morningId: null,
      afternoonId: null,
      eveningId: null,
    }));
  }, []);

  // Compute derived state
  const morningExp = useMemo(
    () => experiences.find((e) => e.id === plan.morningId) || null,
    [plan.morningId]
  );
  const afternoonExp = useMemo(
    () => experiences.find((e) => e.id === plan.afternoonId) || null,
    [plan.afternoonId]
  );
  const eveningExp = useMemo(
    () => experiences.find((e) => e.id === plan.eveningId) || null,
    [plan.eveningId]
  );

  const selectedList = useMemo(() => {
    const list = [];
    if (morningExp) list.push({ slot: "Morning", ...morningExp });
    if (afternoonExp) list.push({ slot: "Afternoon", ...afternoonExp });
    if (eveningExp) list.push({ slot: "Evening", ...eveningExp });
    return list;
  }, [morningExp, afternoonExp, eveningExp]);

  const selectedCount = selectedList.length;

  const totalPrice = useMemo(() => {
    return selectedList.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  }, [selectedList]);

  return {
    destination: plan.destination,
    setDestination,
    morningExp,
    afternoonExp,
    eveningExp,
    selectedList,
    selectedCount,
    totalPrice,
    selectExperience,
    removeExperience,
    clearPlan,
  };
}
