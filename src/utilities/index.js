/*
Description: Format
Params:
data (string/object): datetime value
displayLocalTime (boolean): show local time or not
*/
export const formatDDMMYY = (data, displayLocalTime) => {
  if(!data) return '';
  const date = typeof data.getMonth === 'function' ? data : (typeof data === 'string') ? new Date(data) : '';
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `${d > 9 ? d : "0"+d}/${m > 9 ? m : "0"+m}/${y} ${!!displayLocalTime ? date.toLocaleTimeString() : ''}`;
};
