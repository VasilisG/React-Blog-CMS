export const areDatesEqual = (d1, d2) => {
  return d1.getTime() === d2.getTime();
}

export const formatDate = (date) => {
  const dateObj = new Date(date);
  const newDate = `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`;
  return newDate;
}

export const formatDatetime = (date) => {
  const dateObj = new Date(date);
  const newDate = formatDate(dateObj);
  const newTime = dateObj.toLocaleTimeString('en-US');
  return `${newDate} ${newTime}`;
}