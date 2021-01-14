import { atom } from 'recoil';
import { ITimer } from './types';

export const timersState = atom<Array<ITimer>>({
  key: 'timersState',
  default: [],
});

export const isFormVisibleState = atom<boolean>({
  key: 'isFormVisibleState',
  default: false,
});
