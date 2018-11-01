import React, { Component } from 'react';
import styled from 'styled-components';
import Button from './Button.jsx';
import { getStoredJSON, putJSONInStorage, countDateDiff } from '../utils';

const List = styled.ul`
  padding-left: 0;
`;

const ListItem = styled.li`
  list-style: none;
`;

export default class TimersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [],
    };

    this.deleteTimer = this.deleteTimer.bind(this);
  }

  componentWillMount() {
    const timers = getStoredJSON('timers');
    this.setState({ timers });
  }

  componentDidUpdate() {
    putJSONInStorage("timers", this.state.timers);
  }

  deleteTimer(timer) {
    const timers = this.state.timers.filter(t => t.id !== timer);
    this.setState({ timers });
  }

  render() {
    let timers;

    if (this.state.timers !== null && this.state.timers.length !== 0) {
      timers = this.state.timers.map((timer) => {
        const dateDiff = countDateDiff(Date.now(), timer.date);
        const diffString = `${dateDiff.days} days ${dateDiff.hours} hours ${dateDiff.minutes} minutes ${dateDiff.seconds} seconds left`;

        return (
          <ListItem key={timer.id}>
            {timer.name} - {diffString}
            <Button onClick={() => {this.deleteTimer(timer.id)}}>Delete</Button>
          </ListItem>);
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
