import React, { useState, useEffect } from 'react';
import {
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import styled from 'styled-components';
import { isDate } from 'date-fns';
import Button from './Button.jsx';
import {
  timersState,
  isFormVisibleState,
  nameInputState,
  dateInputState,
  timeInputState,
  errorState,
} from '../atoms.js';

export default () => {
  const [name, setName] = useRecoilState(nameInputState);
  const [date, setDate] = useRecoilState(dateInputState);
  const [time, setTime] = useRecoilState(timeInputState);
  const [error, setError] = useRecoilState(errorState);
  const addTimer = useSetRecoilState(timersState);
  const setFormVisibility = useSetRecoilState(isFormVisibleState);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const editTimer = (something) => {
    console.log('hehehehehe');
  }

  const createNewTimer = (event) => {
    event.preventDefault();
    const dateTimeString = `${date} ${time}`;

    try {
      if (name === '') throw 'EMPTY_NAME';
      if (date === '') throw 'EMPTY_DATE';
      if (time === '') throw 'EMPTY_TIME';
      if(isDate(Date.parse(dateTimeString))) throw 'INVALID_DATE'; // TODO: does this work?

      addTimer(oldTimers => [
        ...oldTimers,
        {
          id: Date.now(),
          name,
          date: Date.parse(dateTimeString),
        }
      ]);

      setFormVisibility(old => !old);
      setName('');
      setDate('');
      setTime('');
    } catch (err) {
      switch(err) {
        case 'EMPTY_NAME':
          setError({ message: 'EMPTY_NAME' });
          break;
        case 'EMPTY_DATE':
          setError({ message: 'EMPTY_DATE' });
          break;
        case 'EMPTY_TIME':
          setError({ message: 'EMPTY_TIME' });
          break;
        case 'INVALID_DATE':
          setError({ message: 'INVALID_DATE' });
          break;
        default:
          setError({ message: 'ERROR_HIHI' });
          break;
      }
    }
  };

  // useEffect(() => {
  //   if (defaultValues && defaultValues.name) setName(defaultValues.name);
  //   if (defaultValues && defaultValues.date) setDate(defaultValues.date);
  //   if (defaultValues && defaultValues.time) setTime(defaultValues.time);
  // }, [defaultValues]);

  return (
    <Form>
      <Container>
        <Name>Name:</Name>
        {error && error.input === 'name' && <Error>Enter name</Error>}
      </Container>
      <Input
        type="text"
        name="name"
        placeholder="Enter name"
        onChange={handleChangeName}
        value={name}
      />
      <Container>
        <Name>Date and time:</Name>
        {error && error.input === 'date' && <Error>Enter correct date</Error>}
        {error && error.input === 'time' && <Error>Enter correct time</Error>}
      </Container>
      <Input
        type="date"
        name="date"
        placeholder="Enter date"
        onChange={handleChangeDate}
        value={date}
      />
      <Input
        type="time"
        name="time"
        placeholder="Enter time (optional)"
        onChange={handleChangeTime}
        value={time}
      />
      <Button onClick={createNewTimer}>Create</Button>
    </Form>
  );
}

const Input = styled.input`
  width: 300px;
  box-sizing: border-box;
  font-size: 1.2rem;
  padding: 0.3rem 0.5rem;
  margin: 6px 0;
  color: #6e778a;
  border: 2px solid #d8dee9;
  border-radius: 3px;
  outline: 0;
  transition: .1s ease-in-out;
  ::placeholder {
    color: #d8dee9;
  }
  :active, :focus {
    border: 2px solid #5e81ac;
  }
`;

const Form = styled.form`
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const Container = styled.div`
  width: 100%;
  text-align: left;
  margin: 12px 0 4px 0;
  :after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Name = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Error = styled.span`
  float: right;
  color: #bf616a;
`;
