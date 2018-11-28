import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from './Icon.jsx';
import Button from './Button.jsx';
import { getStoredJSON, putJSONInStorage, countDateDiff } from '../utils';

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

export default class TimersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [],
    };

    this.fetchTimers = this.fetchTimers.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
  }

  componentWillMount() {
    this.fetchTimers();
    console.log('get items (MOUNT)');
  }

  componentWillUpdate() {
    console.log('get items (UPDATE)');
  }

  componentDidUpdate() {
    if(this.props.refresh === 'true') {
      this.fetchTimers();
    }

    console.log('component(LIST) did update');
    putJSONInStorage("timers", this.state.timers);
  }

  fetchTimers() {
    const timers = getStoredJSON('timers');
    this.setState({ timers });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.refresh === 'true') {
      this.forceUpdate();
    }
  }

  deleteTimer(timer) {
    const timers = this.state.timers.filter(t => t.id !== timer);

    this.setState({ timers });
    console.log('delete timer');
  }

  render() {
    let timers;

    if (this.state.timers !== null && this.state.timers.length !== 0) {
      timers = this.state.timers.map((timer) => {
        const dateDiff = countDateDiff(Date.now(), timer.date);
        const diffString = `${dateDiff.days} days ${dateDiff.hours} hours ${dateDiff.minutes} minutes ${dateDiff.seconds} seconds left`;

        return (
          <Timer key={timer.id}>
            <TimerTitle>{timer.name}</TimerTitle>
            <TimerTimeLeft>{diffString}</TimerTimeLeft>
            <DeleteButton onClick={() => {this.deleteTimer(timer.id)}}>
              <Icon icon="close-outline" />
            </DeleteButton>
          </Timer>);
      });
  } else {
    timers = <span>You didn't created any countdown timers yet</span>;
  }

    return (
      <List>
        {timers}
      </List>
    );
  }
}
