import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input.jsx';
import Button from './Button.jsx';
import { retrieveData, storeData } from '../utils';

const Form = styled.form`
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const Hint = styled.p`
  font-size: 0.775em;
  color: #6B7487;
`;

const Name = styled.p`
  text-align: left;
  font-weight: bold;
  margin-bottom: 4px;
`;

export default class AddTimerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: '',
      nameInputError: false,
      dateInputError: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.createNewTimer = this.createNewTimer.bind(this);
  }

  handleChangeName(event) {
    this.state.nameInputError !== true
      ? this.setState({ name: event.target.value })
      : this.setState({
        name: event.target.value,
        nameInputError: false,
      });
  }

  handleChangeDate(event) {
    const date = event.target.value;

    this.state.dateInputError !== true
      ? this.setState({ date })
      : this.setState({
        date,
        dateInputError: false,
      });
  }

  createNewTimer(event) {
    event.preventDefault();

    try {
      const timers = retrieveData('timers');
      const newTimer = {
        id: Date.now(),
        name: this.state.name,
        date: Date.parse(this.state.date),
      };
      const regex = /^(\d{1,4}(\s|-)\d{1,2}(\s|-)\d{1,2})|(\d{1,4}(\s|-)\d{1,2}(\s|-)\d{1,2} ([0-1][0-9]:[0-5][0-9]|2[0-3]:[0-5][0-9]))$/;

      if (this.state.name === '') throw 'EMPTY_NAME';
      if (this.state.date === '') throw 'EMPTY_DATE';
      if (isNaN(newTimer.date)) throw 'INVALID_DATE';
      if (this.state.date.match(regex) === null) throw 'INVALID_DATE';

      timers === null
        ? storeData('timers', [newTimer])
        : storeData('timers', [...timers, newTimer]);

      this.props.updateList();
      this.props.toggleForm();
    } catch (err) {
      console.error('ERROR!!!', err);

      if (err === 'EMPTY_NAME') this.setState({ nameInputError: true });
      if (err === 'EMPTY_DATE') this.setState({ dateInputError: true });
      if (err === 'INVALID_DATE') this.setState({ dateInputError: true });
    }
  }

  render() {
    const nameInput = this.state.nameInputError !== true
          ? <Input type="text" name="name" placeholder="Enter name" onChange={this.handleChangeName} />
          : <Input type="text" name="name" placeholder="Enter name" onChange={this.handleChangeName} invalid="true" />;

    const dateInput = this.state.dateInputError !== true
          ? <Input type="text" name="date" placeholder="Enter date" onChange={this.handleChangeDate} />
          : <Input type="text" name="date" placeholder="Enter date" onChange={this.handleChangeDate} invalid="true" />;

    return (
      <Form>
        <Name>Name:</Name>
        {nameInput}
        <Name>Date:</Name>
        {dateInput}
        <Hint>Use following date format: yyyy-mm-dd hh:mm<br />Time is optional.</Hint>
        <Button onClick={this.createNewTimer}>Create</Button>
      </Form>
    );
  }
}
