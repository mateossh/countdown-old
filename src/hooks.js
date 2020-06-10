import { useState } from 'react';

export const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return () => setValue(value => ++value);
}

export const useLocalStorage = () => {
  const retrieveTimers = () => {
    const data = localStorage.getItem('timers');

    if (data !== 'null' && data !== null) {
      return JSON.parse(data);
    }
    return [];
  }

  const storeTimers = (timers) => {
    timers = JSON.stringify(timers);
    localStorage.setItem('timers', timers);
  }

  return [retrieveTimers, storeTimers];
}
