import { atom } from 'recoil';

export const timersState = atom({
  key: 'timersState',
  default: [],
});

export const isFormVisibleState = atom({
  key: 'isFormVisibleState',
  default: false,
});

// ---------------------------------------------------------------

export const nameInputState = atom({
  key: 'nameInput',
  default: '',
});

export const dateInputState = atom({
  key: 'dateInput',
  default: '',
});

export const timeInputState = atom({
  key: 'timeInput',
  default: '',
});

export const errorState = atom({
  key: 'errorState',
  default: null,
});
