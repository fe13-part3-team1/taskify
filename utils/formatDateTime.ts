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

export function formatDate(dateString: string, showTime: boolean = false): string {
  if (!dateString) return '';

  const [date, time] = dateString.split(' ');
  const formattedDate = date.replace(/-/g, '.');

  if (showTime && time) {
    const [hours, minutes] = time.split(':');
    return `${formattedDate} ${hours}:${minutes}`;
  }

  return formattedDate;
}

export function parseDateTime(dateString: string): Date | null {
  if (!dateString) return null;

  const formattedString = dateString.replace(' ', 'T') + ':00';
  const date = new Date(formattedString);
  return date;
}

export function formatISODateTime(isoString: string): string {
  if (!isoString) return '';

  const [datePart, timePart] = isoString.split('T');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}
