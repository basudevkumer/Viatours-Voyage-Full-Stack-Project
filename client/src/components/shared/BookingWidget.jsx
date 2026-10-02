"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import TravelerCounter from "@/components/ui/TravelerCounter";
import PriceTag from "@/components/ui/PriceTag";
import BottomSheet from "@/components/ui/BottomSheet";
import TrustBadges from "@/components/shared/TrustBadges";
import { checkAvailability } from "@/services/bookingService";

export default function BookingWidget({ itemId, itemType, price, currency = "USD", cancellation, className }) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const availability = async () => {
    if (!date) { setMessage("Choose a date to continue."); return; }
    setLoading(true); setMessage("");
    try { const result = await checkAvailability({ itemId, itemType, date, adults, children: childCount }); setMessage(result.message); }
    catch (error) { setMessage(error.message || "Availability could not be checked."); }
    finally { setLoading(false); }
  };
  const controls = <><DatePicker label="Travel date" value={date} onChange={(event) => setDate(event.target.value)} /><TravelerCounter adults={adults} childCount={childCount} onAdultsChange={setAdults} onChildCountChange={setChildCount} /><Button type="button" loading={loading} onClick={availability} data-analytics-id="booking-start" fullWidth>Check availability</Button>{message && <p role="status" className="body5 text-text-secondary">{message}</p>}</>;
  return <>
    <aside className={`sticky top-28 hidden rounded-2xl border border-gray6 bg-white p-5 shadow-sm lg:block ${className || ""}`}><PriceTag price={price} currency={currency} size="lg" /><div className="my-5 grid gap-5">{controls}</div>{cancellation && <p className="body5 mb-4 text-text-secondary">{cancellation}</p>}<TrustBadges className="border-t border-gray6 pt-4" /></aside>
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-gray6 bg-white p-3 shadow-lg lg:hidden"><PriceTag price={price} currency={currency} size="sm" /><Button type="button" size="sm" onClick={() => setSheetOpen(true)} data-analytics-id="booking-start">Check availability</Button></div>
    <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Check availability" overlayClassName="items-end p-0 lg:hidden"><div className="grid gap-5">{controls}{cancellation && <p className="body5 text-text-secondary">{cancellation}</p>}<TrustBadges /></div></BottomSheet>
  </>;
}
