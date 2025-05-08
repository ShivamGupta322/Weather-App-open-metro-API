export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  // Return formatted date as "Mon, Jan 1, 2023"
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};