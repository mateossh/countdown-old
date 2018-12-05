export function getStoredJSON(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function putJSONInStorage(key, value) {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

export function countDateDiff(date1, date2) {
  let diff = date2 - date1;
  const mode = diff < 0 ? "SINCE" : "TO";

  diff = Math.abs(diff/1000);

  const seconds = Math.floor(diff % 60);
  diff = diff/60;
  const minutes = Math.floor(diff % 60);
  diff = diff/60;
  const hours = Math.floor(diff % 24);
  const days = Math.floor(diff/24);

  return {
    mode,
    days,
    hours,
    minutes,
    seconds,
  };
}
