import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  lightFormat,
  formatDuration,
  intervalToDuration,
  isAfter,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-timezone';
import Button from './Button';
import {
  timersState,
  isFormVisibleState,
  nameInputState,
  dateInputState,
  timeInputState,
} from '../atoms';
import { useForceUpdate } from '../hooks';

export default (props) => {
  const [name, setName] = useRecoilState(nameInputState);
  const [date, setDate] = useRecoilState(dateInputState);
  const [time, setTime] = useRecoilState(timeInputState);
  const [timers, setTimers] = useRecoilState(timersState);
  const [isFormVisible, setFormVisibility] = useRecoilState(isFormVisibleState);
  const setDefaultValues = useSetRecoilState(isFormVisibleState);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const updateInterval = setInterval(() => { forceUpdate() }, 1000);

    return () => {
      clearInterval(updateInterval);
    }
  }, []); // eslint-disable-line

  const deleteTimer = (timer) => {
    const confirmation = window.confirm('Are you sure you want to delete this timer?');

    if (confirmation) {
      const newTimers = timers.filter(t => t.id !== timer);
      setTimers(newTimers);
    }
  }

  const editTimer = (timerId) => {
    // FLOW: filter out timer with id -> copy and modify it
    //       remove original timer from array -> 
    //       push modified timer -> sort array by timer id

    const timer = timers.filter(t => t.id === timerId)[0];
    const timersExceptUpdated = timers.filter(t => t.id !== timerId);

    setName(timer.name);

    const q = Date(timer.date);

    // const a = zonedTimeToUtc(timer.date, 'Europe/London');
    //
    // const q = Date.parse(timer.date).getUTCMilliseconds();
    
    const date1 = lightFormat(q, 'yyyy-MM-dd');
    console.log('heheuhueheu', date1);
    // setDate(timer.date);
    // setTime(timer.time);
    // TODO: here compute new date/time and set new value to updatedTimer

    // NOTE: THis doesn't work at all
    // setDefaultValues(() => {
    //   return {
    //     name: timer[0].name,
    //   }
    // });
    
    if (isFormVisible === true) {
      // TODO: use recoil snapshots?
      window.alert('EDGE CASE!!!!!, TBD');
    } else {
      setFormVisibility(prevValue => !prevValue);
    }

    const newTimers = [...timersExceptUpdated, timer].sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
    setTimers(() => newTimers);
  }

  const countElapsedTime = (date) => {
    const now = Date.now()
    const mode = isAfter(Date.now(), date) ? 'since' : 'left';

    const duration = intervalToDuration({
      start: now,
      end: date,
    });

    return `${formatDuration(duration)} ${mode}`;
  }

  return (
    <List>
      {timers && timers.length === 0
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
                <TimerIconsContainer>
                  <IconButton onClick={() => { editTimer(timer.id) }}>
                    <i data-eva="edit-outline" />
                  </IconButton>
                  <IconButton onClick={() => { deleteTimer(timer.id) }}>
                    <i data-eva="close-outline" />
                  </IconButton>
                </TimerIconsContainer>
              </TimerHead>
              <TimerTimeLeft>
                {countElapsedTime(timer.date)}
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

const TimerIconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TimerTimeLeft = styled.h3`
  color: #6e778a;
  font-weight: 400;
  font-size: 0.9rem;
  margin: 14px 0;
`;

const IconButton = styled(Button)`
  width: 24px;
  height: 24px;
  border: 0;
  margin: 0 12px;
  padding: 0;
`;
