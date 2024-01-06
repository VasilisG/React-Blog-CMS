const createLookup = (cookies) => {
  const cookieLookup = {};
  const cookiesArr = cookies.split(', ');
  cookies.forEach(cookie => {
    const [key, value] = cookie.split('=');
    cookieLookup[key] = value;
  });
  return cookieLookup;
}

exports.getCookie = (cookies, name) => {
  const cookieLookup = createLookup(cookies);
  return name in cookieLookup ? cookieLookup[name] : null;
}