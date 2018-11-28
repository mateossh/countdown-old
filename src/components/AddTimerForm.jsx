import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input.jsx';
import Button from './Button.jsx';
import { getStoredJSON, putJSONInStorage } from '../utils';

const Form = styled.form`
  margin: 0 24px;
  text-align: center;
`;

const Hint = styled.p`
  font-size: 0.775em;
  color: #6B7487;
`;

export default class AddTimerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: new Date(),
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createNewTimer = this.createNewTimer.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeDate(event) {
    const date = Date.parse(event.target.value);
    this.setState({ date });
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

    console.log('create new item');
    // this.props.updateList();
    // this.props.toggleForm();
  }

  render() {
    return (
      <Form>
        <Input type="text" name="name" placeholder="Enter name" onChange={this.handleChangeName} />
        <Input type="text" name="date" placeholder="Enter date" onChange={this.handleChangeDate} />
        <Hint>Use following date format: yyyy-mm-dd hh:mm</Hint>
        <Button onClick={this.createNewTimer}>Create</Button>
      </Form>
    );
  }
}
