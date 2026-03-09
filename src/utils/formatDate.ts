const formatDate = (isoString: string, isPostDetail = false): string => {
  const date = new Date(isoString);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getUTCDate()).padStart(2, "0");
  const hours = String(kstDate.getUTCHours()).padStart(2, "0");
  const minutes = String(kstDate.getUTCMinutes()).padStart(2, "0");

  const today = new Date();
  const kstToday = new Date(today.getTime() + 9 * 60 * 60 * 1000);

  const isToday =
    year === kstToday.getUTCFullYear() &&
    month === String(kstToday.getUTCMonth() + 1).padStart(2, "0") &&
    day === String(kstToday.getUTCDate()).padStart(2, "0");

  if (isPostDetail) {
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  return isToday ? `${hours}:${minutes}` : `${year}/${month}/${day}`;
};

export { formatDate };