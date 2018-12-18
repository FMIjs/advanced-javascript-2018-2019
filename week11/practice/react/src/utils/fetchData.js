export function fetchData(url, options) {
  return fetch(url, options).then(response => {
    if (!response.ok) { throw new Error(response.statusText); }
    return response.json();
  });
}
