import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// @ts-ignore: Expected types for eva-icons
import * as eva from 'eva-icons';
import Button from './Button.jsx';
import { timersState } from '../atoms';
import { useForceUpdate, useTimersStorage } from '../hooks';
import { ITimer } from '../types';

const TimersList: React.FunctionComponent = () => {
  const [timers, setTimers] = useRecoilState(timersState);
  const forceUpdate = useForceUpdate();
  const [retrieveTimers, saveTimers] = useTimersStorage();

  const loadTimersFromStorage = () => {
    const savedTimers = retrieveTimers();
    setTimers(savedTimers);
  }

  useEffect(() => {
    loadTimersFromStorage();
    const updateInterval = setInterval(() => { forceUpdate() }, 1000);

    return () => {
      clearInterval(updateInterval);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    eva.replace();
  }, [timers]);

  const deleteTimer = (timer: ITimer['id']): void => {
    const confirmation = window.confirm('Are you sure you want to delete this timer?');

    if (confirmation) {
      const newTimers = timers.filter(t => t.id !== timer);
      setTimers(newTimers);
      saveTimers(newTimers);
    }
  }

  const countDateDiff = (date1: number, date2: number): string => {
    let diff = date2 - date1;
    let finalString = '';
    const mode = diff < 0 ? 'since' : 'left';

    diff = Math.abs(diff / 1000);
    const firstDiff = diff;

    const seconds = Math.floor(diff % 60);
    diff = diff / 60;
    const minutes = Math.floor(diff % 60);
    diff = diff / 60;
    const hours = Math.floor(diff % 24);
    const days = Math.floor(diff / 24);

    if (firstDiff >= 60 * 60 * 24) finalString += `${days} days `;
    if (firstDiff >= 60 * 60) finalString += `${hours} hours `;
    if (firstDiff >= 60) finalString += `${minutes} minutes `;
    finalString += `${seconds} seconds ${mode}`;

    return finalString;
  }

  return (
    <List>
      { timers && timers.length === 0
        ? <span>
            You haven't created any countdown timers yet&nbsp;
            <span role="img" aria-label="Sadface">😔</span>
          </span>
        : null }

      { timers && timers.length > 0
        ? timers.map(timer => (
            <Timer key={timer.id}>
              <TimerHead>
                <TimerTitle>{timer.name}</TimerTitle>
                <DeleteButton onClick={() => {deleteTimer(timer.id)}}>
                  <i data-eva="close-outline" />
                </DeleteButton>
              </TimerHead>
              <TimerTimeLeft>
                {countDateDiff(Date.now(), timer.date)}
              </TimerTimeLeft>
            </Timer>
          ))
        : null
      }
    </List>
  );
}

const List = styled.ul`
  padding-left: 0;
  margin: 0;
  line-height: 1.5;
`;

const Timer = styled.li`
  list-style: none;
  position: relative;
  box-sizing: border-box;
  margin: 36px 0;
`;

const TimerHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimerTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
`;

const TimerTimeLeft = styled.h3`
  color: #6e778a;
  font-weight: 400;
  font-size: 0.9rem;
  margin: 14px 0;
`;

const DeleteButton = styled(Button)`
  width: 24px;
  height: 24px;
  border: 0;
  margin: 0;
  padding: 0;
`;

export default TimersList;
