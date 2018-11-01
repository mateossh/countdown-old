import React, { Component } from 'react';
import styled from 'styled-components';
import Input from './Input.jsx';

const DatePickerBox = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const Hint = styled.p`
  font-size: 0.775em;
  color: #6B7487;
`;

export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  handleChangeDate(event) {
    const date = Date.parse(event.target.value);
    this.props.getDate(date);
  }

  render() {
    return (
      <DatePickerBox>
        <Input type="text" name="date" placeholder="Enter date" onChange={this.handleChangeDate} />
        <Hint>Use following date format: yyyy-mm-dd hh:mm</Hint>
      </DatePickerBox>
    );
  }
}
