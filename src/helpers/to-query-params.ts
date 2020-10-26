export const toQueryParams = (obj: object) =>  Object.entries(obj).map(([key, value]) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }).join('&')