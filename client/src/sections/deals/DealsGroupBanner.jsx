"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { submitTripInquiry } from "@/services/leadService";
import { FiUsers, FiCheckCircle, FiX, FiArrowRight } from "react-icons/fi";

export default function DealsGroupBanner() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    groupSize: "6-10 travelers",
    destination: "Flexible / Multiple",
    travelDates: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Please provide your name and work/personal email address.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await submitTripInquiry({
        type: "group",
        name: formData.name.trim(),
        email: formData.email.trim(),
        groupSize: formData.groupSize,
        destination: formData.destination,
        travelDates: formData.travelDates,
        notes: formData.notes,
      });

      if (res.success) {
        setSuccess(true);
        setStatus({ type: "success", message: res.message });
      } else {
        setStatus({
          type: "error",
          message: res.message || "Failed to submit request. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Network error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-primary/95 py-14 text-white sm:py-20 lg:py-24" id="group-quotes">
      <Container>
        <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-dark/40 p-8 backdrop-blur-md lg:flex-row lg:p-12">
          <div className="max-w-2xl text-left">
            <span className="caption uppercase tracking-wider text-accent font-semibold">
              GROUP & CORPORATE TRAVEL DESK
            </span>
            <h2 className="heading mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Travelling with a group of 6 or more? Request a quote
            </h2>
            <p className="body2 mt-3 text-white/80">
              For family reunions, team retreats, and special celebrations, we negotiate bespoke allocations directly with local operators and private transport partners. Tell us your vision and we will assemble an itemized proposal.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <FiUsers className="text-accent" aria-hidden="true" /> Dedicated coordinator
              </span>
              <span>•</span>
              <span>Private vehicle upgrades</span>
              <span>•</span>
              <span>Itemized quote within 24 hours</span>
            </div>
          </div>

          <div className="shrink-0">
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              data-analytics-id="group-quote-open-modal"
              rightIcon={<FiArrowRight aria-hidden="true" />}
              className="hover:!bg-white hover:!text-accent"
            >
              Request a group quote
            </Button>
          </div>
        </div>

        {/* Modal dialog for group quote request */}
        {modalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="group-quote-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 p-4 backdrop-blur-sm"
          >
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-gray6 bg-white p-6 text-dark shadow-2xl sm:p-8">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close group quote dialog"
                className="absolute right-4 top-4 rounded-full p-2 text-text-secondary hover:bg-gray7 hover:text-dark focus-visible:outline-none"
              >
                <FiX className="h-5 w-5" aria-hidden="true" />
              </button>

              <span className="caption uppercase tracking-wider text-accent font-semibold">
                CUSTOM QUOTE REQUEST
              </span>
              <h3 id="group-quote-title" className="title1 mt-1 text-dark">
                Tell us about your group
              </h3>
              <p className="body4 mt-1 text-text-secondary">
                We will check private operator allocations and reply with a tailored quote within 24 hours.
              </p>

              {success ? (
                <div className="my-8 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-2xl text-success">
                    <FiCheckCircle aria-hidden="true" />
                  </div>
                  <h4 className="title2 text-dark">Quote request received</h4>
                  <p className="body3 mt-2 text-text-secondary">
                    Our group travel coordinator has received your details and will prepare a tailored proposal for {formData.email}.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setSuccess(false);
                      setModalOpen(false);
                    }}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                  <Input
                    label="Full name"
                    required
                    placeholder="E.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="min-h-[44px] text-base"
                  />

                  <Input
                    label="Email address"
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="min-h-[44px] text-base"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Group size"
                      value={formData.groupSize}
                      onChange={(e) =>
                        setFormData({ ...formData, groupSize: e.target.value })
                      }
                      className="min-h-[44px] text-base"
                    >
                      <option value="6-10 travelers">6 - 10 travelers</option>
                      <option value="11-20 travelers">11 - 20 travelers</option>
                      <option value="21-50 travelers">21 - 50 travelers</option>
                      <option value="50+ travelers">50+ travelers</option>
                    </Select>

                    <Input
                      label="Target dates"
                      placeholder="E.g. Nov 2026"
                      value={formData.travelDates}
                      onChange={(e) =>
                        setFormData({ ...formData, travelDates: e.target.value })
                      }
                      className="min-h-[44px] text-base"
                    />
                  </div>

                  <Input
                    label="Destination or style"
                    placeholder="E.g. Bali cultural immersion, Tokyo food & rail"
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    className="min-h-[44px] text-base"
                  />

                  <label className="block">
                    <span className="title4 block mb-1 text-dark">
                      Special requests (optional)
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Private guide preference, dietary requirements, team activities..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full rounded-xl border border-gray5 p-3 text-base text-dark focus:border-accent focus:outline-none"
                    />
                  </label>

                  {status.type === "error" && (
                    <p className="caption text-error">{status.message}</p>
                  )}

                  <div className="mt-6 flex justify-end gap-3 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={loading}
                      data-analytics-id="group-quote-submit"
                    >
                      Submit quote request
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
