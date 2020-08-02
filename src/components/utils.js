export const pluralize = (string) => {
  if (string[string.length - 1] === 'y') {
    return string.slice(0, string.length - 1) + 'ies'
  } else {
    return string + 's'
  }
}

export const toQueryString = (obj) => {
  const parts = [];
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
    }
  }
  return parts.join('&');
}