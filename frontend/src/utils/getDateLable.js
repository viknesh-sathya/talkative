export default function getDateLabel(date) {
  const msgDate = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (msgDate.toDateString() === today.toDateString()) return "Today";

  if (msgDate.toDateString() === yesterday.toDateString()) return "Yesterday";

  return msgDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
