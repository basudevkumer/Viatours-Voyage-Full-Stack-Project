export function formatPrice(amount, currency = "USD") {
  const value = Number(amount);
  if (!Number.isFinite(value)) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export function formatDuration(duration) {
  if (typeof duration === "string") return duration;
  const minutes = Number(duration);
  if (!Number.isFinite(minutes) || minutes < 0) return "";
  if (minutes < 60) return `${minutes} ${pluralize(minutes, "minute")}`;
  const hours = minutes / 60;
  return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} ${pluralize(hours, "hour")}`;
}

export function formatDate(date, options = {}) {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", options).format(value);
}

export function pluralize(count, word) {
  return `${count} ${word}${Number(count) === 1 ? "" : "s"}`;
}
