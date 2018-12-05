import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from './Icon.jsx';
import Button from './Button.jsx';
import { countDateDiff } from '../utils';

const List = styled.ul`
  padding-left: 0;
`;

const Timer = styled.li`
  list-style: none;
  position: relative;
  box-sizing: border-box;
  margin: 36px 0;
`;

const TimerTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
`;

const TimerTimeLeft = styled.h3`
  color: gray;
  font-weight: 400;
  font-size: 0.9rem;
`;

const DeleteButton = styled(Button)`
  border: 0;
  margin: 6px;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
`;

const TimersList = (props) => {
  let timers;

  if (props.timers !== null && props.timers.length !== 0) {
    timers = props.timers.map((timer) => {
      const dateDiff = countDateDiff(Date.now(), timer.date);
      const diffString = dateDiff.mode === "TO"
        ? `${dateDiff.days} days ${dateDiff.hours} hours ${dateDiff.minutes} minutes ${dateDiff.seconds} seconds left`
        : `${dateDiff.days} days ${dateDiff.hours} hours ${dateDiff.minutes} minutes ${dateDiff.seconds} seconds since`;

      return (
        <Timer key={timer.id}>
          <TimerTitle>{timer.name}</TimerTitle>
          <TimerTimeLeft>{diffString}</TimerTimeLeft>
          <DeleteButton onClick={() => {props.deleteTimer(timer.id)}}>
            <Icon icon="close-outline" />
          </DeleteButton>
        </Timer>);
    });
  } else {
    timers = <span>You haven't created any countdown timers yet 😔</span>;
  }

  return (
    <List>
      {timers}
    </List>
  );
}

export default TimersList;
