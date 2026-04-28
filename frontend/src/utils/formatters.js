export const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value || 0);

export const formatPercent = (value) => `${Math.round(value || 0)}%`;

export const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));

export const formatTime = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));

