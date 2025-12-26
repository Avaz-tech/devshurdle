export function formatDateUtcShort(isoString: string): string {
  if (!isoString) return "";

  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth();
  const day = date.getUTCDate();

  const month = monthsShort[monthIndex] ?? "";
  const yearShort = String(year).slice(2);

  return `${month} ${day}, ${yearShort}`;
}


