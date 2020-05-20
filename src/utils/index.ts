export const retrieveData = (key: string): string => {
  const data: any = localStorage.getItem(key);
  return JSON.parse(data);
}

export const storeData = (key: string, value: string): void => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}

interface DateDiff {
  mode: string,
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
};

export const countDateDiff = (date1: number, date2: number): DateDiff => {
  let diff: any = date2 - date1;
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
