import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as eva from 'eva-icons';
import Header from './Header.jsx';
import TimersList from './TimersList.jsx';
import AddTimerForm from './AddTimerForm.jsx';
import Footer from './Footer.jsx';
import Button from './Button.jsx';
import { retrieveData, storeData } from '../utils/index.ts';

const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue(value => ++value);
}

export default () => {
  const [timers, setTimers] = useState([]);
  const [isFormVisible, setFormVisibility] = useState(false);
  const forceUpdate = useForceUpdate();

  const fetchTimers = () => {
    const timers = retrieveData('timers');
    setTimers(timers);
  }

  const deleteTimer = (timer) => {
    const confirmation = window.confirm('Are you sure you want to delete this timer?');

    if (confirmation) {
      const newTimers = timers.filter(t => t.id !== timer);
      setTimers(newTimers);
      storeData('timers', newTimers);
    }
  }

  useEffect(() => {
    const updateInterval = setInterval(() => { forceUpdate() }, 1000);
    fetchTimers();

    return () => {
      clearInterval(updateInterval);
    }
  }, []);

  useEffect(() => {
    eva.replace();
  }, [timers]);

  return (
    <Container>
      <StyledMain>
        <Header />
        <TimersList
          timers={timers}
          deleteTimer={timer => deleteTimer(timer)}
        />
      </StyledMain>
      <ButtonWrapper>
        <Button
          onClick={() => setFormVisibility(!isFormVisible)}
        >
          Add Timer
        </Button>
      </ButtonWrapper>
      {isFormVisible && <AddTimerForm
        updateList={() => fetchTimers()}
        toggleForm={() => setFormVisibility(!isFormVisible)}
      />}
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Rubik', sans-serif;
  color: #3b4252;
  position: relative;
`;

const StyledMain = styled.main`
  width: 400px;
  padding: 0 24px;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

