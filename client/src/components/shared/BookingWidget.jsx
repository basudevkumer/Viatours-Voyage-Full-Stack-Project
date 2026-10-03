"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import TravelerCounter from "@/components/ui/TravelerCounter";
import PriceTag from "@/components/ui/PriceTag";
import BottomSheet from "@/components/ui/BottomSheet";
import TrustBadges from "@/components/shared/TrustBadges";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { createBookingRequest } from "@/services/bookingService";
import { submitTripInquiry } from "@/services/leadService";
import { FiCalendar, FiCheckCircle, FiHelpCircle, FiShield, FiSend, FiClock } from "react-icons/fi";
import { cn } from "@/lib/cn";

export default function BookingWidget({
  itemId,
  itemType = "tour",
  itemTitle = "",
  price = 0,
  originalPrice = null,
  currency = "USD",
  cancellation = "Free cancellation up to 48 hours before tour start for a full refund.",
  className,
}) {
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);

  // Ask-an-expert question form state
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionData, setQuestionData] = useState({ name: "", email: "", question: "" });
  const [questionLoading, setQuestionLoading] = useState(false);
  const [questionStatus, setQuestionStatus] = useState(null);

  const numPrice = Number(price) || 0;
  const numOriginal = originalPrice ? Number(originalPrice) : null;
  const estimatedSubtotal = numPrice * adults;

  const handleBookingRequest = async () => {
    if (!date) {
      setBookingStatus({
        type: "error",
        message: "Please select your preferred travel date before requesting a booking.",
      });
      return;
    }

    setLoading(true);
    setBookingStatus(null);

    try {
      const res = await createBookingRequest({
        itemId,
        itemType,
        itemTitle,
        date,
        adults,
        children: childCount,
        price: numPrice,
      });

      if (res.success) {
        setBookingStatus({
          type: "success",
          message: res.message,
          data: res.data,
        });
      } else {
        setBookingStatus({
          type: "error",
          message: res.message || "Could not process booking request. Please try again.",
        });
      }
    } catch {
      setBookingStatus({
        type: "error",
        message: "A network issue occurred. Please try again or reach our team directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!questionData.name.trim() || !questionData.email.trim() || !questionData.question.trim()) {
      setQuestionStatus({
        type: "error",
        message: "Please provide your name, email, and question.",
      });
      return;
    }

    setQuestionLoading(true);
    setQuestionStatus(null);

    try {
      const res = await submitTripInquiry({
        type: "question",
        itemId,
        destination: itemTitle,
        name: questionData.name,
        email: questionData.email,
        notes: `Question about ${itemTitle || itemId}: ${questionData.question}`,
      });

      if (res.success) {
        setQuestionStatus({ type: "success", message: res.message });
        setQuestionData({ name: "", email: "", question: "" });
      } else {
        setQuestionStatus({ type: "error", message: res.message || "Failed to submit question." });
      }
    } catch {
      setQuestionStatus({
        type: "error",
        message: "Could not send question. Please contact hi@viatours.com.",
      });
    } finally {
      setQuestionLoading(false);
    }
  };

  const bookingControls = (
    <div className="space-y-4">
      <DatePicker
        label="Select departure date"
        value={date}
        onChange={(event) => {
          setDate(event.target.value);
          if (bookingStatus?.type === "error") setBookingStatus(null);
        }}
        required
      />

      <TravelerCounter
        adults={adults}
        childCount={childCount}
        onAdultsChange={setAdults}
        onChildCountChange={setChildCount}
      />

      {/* Pricing Summary Calculation */}
      <div className="rounded-xl border border-gray6 bg-gray7/60 p-3.5 space-y-1.5">
        <div className="flex items-center justify-between body4 text-text-secondary">
          <span>
            ${numPrice} × {adults} adult{adults > 1 ? "s" : ""}
          </span>
          <span>${estimatedSubtotal.toFixed(2)}</span>
        </div>
        {childCount > 0 && (
          <div className="flex items-center justify-between caption text-text-secondary">
            <span>Children ({childCount})</span>
            <span>Included / Discounted on invoice</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-gray6 pt-2 title4 text-dark font-bold">
          <span>Estimated total</span>
          <span className="text-accent">${estimatedSubtotal.toFixed(2)}</span>
        </div>
        <p className="caption text-text-secondary pt-0.5">
          Taxes and booking permits included. No hidden fees.
        </p>
      </div>

      {bookingStatus?.type === "error" && (
        <p role="alert" className="body5 text-error rounded-lg bg-error/10 p-2.5">
          {bookingStatus.message}
        </p>
      )}

      {bookingStatus?.type === "success" ? (
        <div className="rounded-xl border border-success/20 bg-success/10 p-4 text-center">
          <FiCheckCircle className="mx-auto text-success mb-1.5" size={24} />
          <h4 className="title4 font-bold text-dark mb-1">Reservation Request Received</h4>
          <p className="body5 text-text-secondary mb-3">{bookingStatus.message}</p>
          <span className="caption block font-mono text-dark bg-white rounded-md py-1 px-2 border border-gray6">
            Reference: {bookingStatus.data?.bookingId}
          </span>
        </div>
      ) : (
        <Button
          type="button"
          loading={loading}
          onClick={handleBookingRequest}
          data-analytics-id="booking-reserve-cta"
          fullWidth
          size="md"
        >
          Check availability & reserve
        </Button>
      )}

      {/* Factual Cancellation Reassurance */}
      {cancellation && (
        <div className="flex items-start gap-2 pt-1 body5 text-text-secondary">
          <FiClock className="mt-0.5 shrink-0 text-accent" size={16} aria-hidden="true" />
          <span>{cancellation}</span>
        </div>
      )}

      <TrustBadges className="border-t border-gray6 pt-4" />
    </div>
  );

  return (
    <>
      {/* ─── Desktop Sticky Column ─── */}
      <aside
        className={cn(
          "sticky top-28 hidden rounded-2xl border border-gray6 bg-white p-6 shadow-xs lg:block space-y-6",
          className
        )}
        aria-label="Tour reservation widget"
      >
        <div>
          <span className="caption block font-medium uppercase tracking-wider text-text-secondary mb-1">
            Pricing
          </span>
          <PriceTag price={numPrice} originalPrice={numOriginal} currency={currency} size="lg" />
        </div>

        {bookingControls}

        {/* ─── Ask-an-Expert Mini Lead Form ─── */}
        <div className="border-t border-gray6 pt-5">
          {!showQuestionForm ? (
            <button
              type="button"
              onClick={() => setShowQuestionForm(true)}
              className="caption flex items-center justify-between w-full font-medium text-text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent py-1"
              data-analytics-id="tour-ask-question-toggle"
            >
              <span className="flex items-center gap-1.5">
                <FiHelpCircle className="text-accent" aria-hidden="true" />
                Have a question about this tour?
              </span>
              <span className="text-accent underline">Ask an expert</span>
            </button>
          ) : (
            <form onSubmit={handleQuestionSubmit} noValidate className="space-y-3 pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="title4 text-dark flex items-center gap-1.5">
                  <FiHelpCircle className="text-accent" /> Ask a specialist
                </span>
                <button
                  type="button"
                  onClick={() => setShowQuestionForm(false)}
                  className="caption text-text-secondary hover:text-dark"
                >
                  Close
                </button>
              </div>

              {questionStatus?.type === "success" ? (
                <div className="rounded-lg bg-success/10 border border-success/20 p-3 body5 text-success">
                  {questionStatus.message}
                </div>
              ) : (
                <>
                  {questionStatus?.type === "error" && (
                    <p className="caption text-error">{questionStatus.message}</p>
                  )}
                  <Input
                    label="Your Name"
                    labelClassName="sr-only"
                    placeholder="Your Name"
                    value={questionData.name}
                    onChange={(e) => setQuestionData({ ...questionData, name: e.target.value })}
                    required
                  />
                  <Input
                    label="Email address"
                    labelClassName="sr-only"
                    type="email"
                    placeholder="Email address"
                    value={questionData.email}
                    onChange={(e) => setQuestionData({ ...questionData, email: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="What would you like to know about this itinerary?"
                    rows={2}
                    value={questionData.question}
                    onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
                    required
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    loading={questionLoading}
                    fullWidth
                    rightIcon={<FiSend aria-hidden="true" />}
                    data-analytics-id="tour-question-submit"
                  >
                    Send question
                  </Button>
                </>
              )}
            </form>
          )}
        </div>
      </aside>

      {/* ─── Mobile Fixed Bottom Bar ─── */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-gray6 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg lg:hidden"
        role="region"
        aria-label="Mobile booking action bar"
      >
        <div>
          <span className="caption block text-text-secondary">From</span>
          <PriceTag price={numPrice} originalPrice={numOriginal} currency={currency} size="sm" />
        </div>
        <Button
          type="button"
          size="md"
          onClick={() => setSheetOpen(true)}
          data-analytics-id="mobile-check-availability"
        >
          Check availability
        </Button>
      </div>

      {/* ─── Mobile Bottom Sheet ─── */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={itemTitle || "Check availability & reserve"}
        overlayClassName="items-end p-0 lg:hidden"
      >
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {bookingControls}
        </div>
      </BottomSheet>
    </>
  );
}
