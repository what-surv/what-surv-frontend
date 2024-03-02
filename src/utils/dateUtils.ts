export const formatDateString = (originalDateString: string): string => {
  const originalDate = new Date(originalDateString);
  const formattedDate = `${originalDate.getFullYear()}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getDate().toString().padStart(2, '0')}`;
  return formattedDate;
};
