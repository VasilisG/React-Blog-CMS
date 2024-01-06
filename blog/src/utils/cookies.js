export const getCookie = (name) => {
  const cookieLookup = getCookieLookup();
  return name in cookieLookup ? cookieLookup[name] : null;
}

const getCookieLookup = () => {
  let cookies = document.cookie.split(';').map(item => item.trim());
  let cookieLookup = {};
  for(const cookie of cookies) {
    const [key, value] = cookie.split('=');
    let cleanValue = decodeURIComponent(value);
    cleanValue = cleanValue.startsWith('j:') ? cleanValue.replace('j:', '') : cleanValue;
    cleanValue = cleanValue.replaceAll('"', '');
    cookieLookup[key] = cleanValue;
  }
  return cookieLookup;
}