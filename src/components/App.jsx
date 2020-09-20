import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import * as eva from 'eva-icons';
import Header from './Header.jsx';
import TimersList from './TimersList.jsx';
import TimerForm from './TimerForm.jsx';
import Footer from './Footer.jsx';
import Button from './Button.jsx';
import { timersState, isFormVisibleState } from '../atoms.js';
import { useLocalStorage } from '../hooks.js';

export default () => {
  const [timers, setTimers] = useRecoilState(timersState);
  const [isFormVisible, setFormVisibility] = useRecoilState(isFormVisibleState);
  const [retrieveTimers, storeTimers] = useLocalStorage();

  // TODO: ???
  const fetchTimers = () => {
    const timers = retrieveTimers();
    setTimers(timers);
  }

  useEffect(() => {
    fetchTimers();
  }, []); // eslint-disable-line

  useEffect(() => {
    eva.replace();
    storeTimers(timers);
  }, [timers, storeTimers]);

  return (
    <Container>
      <StyledMain>
        <Header />
        <TimersList />
      </StyledMain>
      <ButtonWrapper>
        <Button
          onClick={() => setFormVisibility(prevValue => !prevValue)}
        >
          Add Timer
        </Button>
      </ButtonWrapper>
      {isFormVisible && <TimerForm />}
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
  box-sizing: border-box;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 24px 0;
`;

