export default function formatDateTime(dateValue: Date | null): string {
  if (!dateValue) return '';

  const date = new Date(dateValue);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const [date] = dateString.split(' ');
  return date.replace(/-/g, '.');
}
