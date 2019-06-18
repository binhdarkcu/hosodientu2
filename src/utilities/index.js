export const formatBirthDay = (date) => {
  if(!data) return null;
  const date = new Date(data);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${d > 9 ? d : "0"+d}/${m > 9 ? m : "0"+m}/${y}`;
};
