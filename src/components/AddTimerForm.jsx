import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Input from './Input.jsx';
import Button from './Button.jsx';
import { timersState, isFormVisibleState } from '../atoms.js';

export default (props) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState({ input: '', message: '' });

  const addTimer = useSetRecoilState(timersState);
  const setFormVisibility = useSetRecoilState(isFormVisibleState);

  const handleChangeName = (event) => {
    if (error.input === 'name') setError({});
    setName(event.target.value);
  };

  const handleChangeDate = (event) => {
    if (error.input === 'date') setError({});
    setDate(event.target.value);
  };

  const createNewTimer = (event) => {
    event.preventDefault();

    try {
      const regex = /^(\d{1,4}(\s|-)\d{1,2}(\s|-)\d{1,2})|(\d{1,4}(\s|-)\d{1,2}(\s|-)\d{1,2} ([0-1][0-9]:[0-5][0-9]|2[0-3]:[0-5][0-9]))$/;

      if (name === '') throw 'EMPTY_NAME';
      if (date === '') throw 'EMPTY_DATE';
      if (isNaN(Date.parse(date)) ||
          date.match(regex) === null) throw 'INVALID_DATE';

      addTimer(oldTimers => [
        ...oldTimers,
        {
          id: Date.now(),
          name,
          date: Date.parse(date),
        }
      ]);

      setFormVisibility(old => !old);
    } catch (err) {
      switch(err) {
        case 'EMPTY_NAME':
          setError({ input: 'name', message: 'EMPTY_NAME' });
          break;
        case 'EMPTY_DATE':
          setError({ input: 'date', message: 'EMPTY_DATE' });
          break;
        case 'INVALID_DATE':
          setError({ input: 'date', message: 'INVALID_DATE' });
          break;
        default:
          setError({ message: 'ERROR_HIHI' });
          break;
      }
    }
  };

  return (
    <Form>
      <Container>
        <Name>Name:</Name>
        {error.input === 'name' && <Error>Enter name</Error>}
      </Container>
      <Input
        type="text"
        name="name"
        placeholder="Enter name"
        onChange={handleChangeName}
        invalid={error.input === 'name' ? 'true' : undefined}
      />
      <Container>
        <Name>Date:</Name>
        {error.input === 'date' && <Error>Enter correct date</Error>}
      </Container>
      <Input
        type="text"
        name="date"
        placeholder="Enter date"
        onChange={handleChangeDate}
        invalid={error.input === 'date' ? 'true' : undefined}
      />
      <Hint>Use following date format: yyyy-mm-dd hh:mm<br />Time is optional.</Hint>
      <Button onClick={createNewTimer}>Create</Button>
    </Form>
  );
}

const Form = styled.form`
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const Hint = styled.p`
  font-size: 0.775em;
  color: #6B7487;
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
  color: red;
`;
