/** "June 15, 2026" — UTC so the build machine's timezone can't shift the day. */
export const formatDate = (date: string | Date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
    : "";
