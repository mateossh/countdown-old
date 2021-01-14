import { useState } from 'react';
import { ITimer } from './types';

export const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return () => setValue(value => ++value);
}

export const useTimersStorage = (): [
  () => Array<ITimer>,
  (timers: Array<ITimer>) => void
] => {
  const getData = (): Array<ITimer> => {
    const timers = localStorage.getItem('timers');
    const data = timers === null ? '[]' : timers;

    return JSON.parse(data);
  }

  const setData = (timers: Array<ITimer>): void => {
    const data = JSON.stringify(timers);
    localStorage.setItem('timers', data);
  }

  return [getData, setData];
};
