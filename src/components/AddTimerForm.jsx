import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input.jsx';
import DatePicker from './DatePicker.jsx';
import Button from './Button.jsx';
import { getStoredJSON, putJSONInStorage } from '../utils';

const Form = styled.form`
  margin: 0 24px;
`;

export default class AddTimerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: new Date(),
    };

    this.getDate = this.getDate.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.createNewTimer = this.createNewTimer.bind(this);
  }

  getDate(date) {
    this.setState({ date });
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  createNewTimer(event) {
    event.preventDefault();

    const timers = getStoredJSON('timers');
    const newTimer = {
      id: Date.now(),
      name: this.state.name,
      date: this.state.date,
    };

    timers === null
      ? putJSONInStorage('timers', [newTimer])
      : putJSONInStorage('timers', [...timers, newTimer]);

    console.log('wtf');
  }

  render() {
    return (
      <Form>
        <Input type="text" name="name" placeholder="Enter name" onChange={this.handleChangeName} />
        <DatePicker getDate={this.getDate} />
        <Button onClick={this.createNewTimer}>Create</Button>
      </Form>
    );
  }
}
