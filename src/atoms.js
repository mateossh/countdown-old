import { atom } from 'recoil';

export const timersState = atom({
  key: 'timersState',
  default: [],
});

export const isFormVisibleState = atom({
  key: 'isFormVisibleState',
  default: false,
});
