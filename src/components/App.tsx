import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Header from './Header';
import TimersList from './TimersList';
import AddTimerForm from './AddTimerForm';
import Footer from './Footer';
import Button from './Button';
import { isFormVisibleState } from '../atoms';

const App: React.FunctionComponent = () => {
  const [isFormVisible, setFormVisibility] = useRecoilState(isFormVisibleState);

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
      {isFormVisible && <AddTimerForm />}
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

export default App;
