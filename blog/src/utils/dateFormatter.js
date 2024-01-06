export const formatDate = (date) => {
  const dateObj = new Date(date);
  const newDate = `${dateObj.getDate()} / ${dateObj.getMonth()+1} / ${dateObj.getFullYear()}`;
  return newDate;
}

export const formatDatetime = (date) => {
  let cleanDate = date.startsWith('j:') ? date.replace('j:', '') : date;
  const dateObj = new Date(cleanDate);
  const newDate = formatDate(dateObj);
  const newTime = dateObj.toLocaleTimeString('en-US');
  return `${newDate} ${newTime}`;
}