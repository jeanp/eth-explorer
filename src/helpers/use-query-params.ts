export const useQueryParams = (name: string): string | null =>
  new URLSearchParams(window.location.search).get(name);
