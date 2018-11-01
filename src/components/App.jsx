import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import TimersList from './TimersList.jsx';
import AddTimerForm from './AddTimerForm.jsx';
import Footer from './Footer.jsx';
import Button from './Button.jsx';

const StyledMain = styled.main`
  width: 400px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ebcb8b;
  color: #3b4252;
  position: relative;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTimerFormShown: false,
    };

    this.toggleDatePicker = this.toggleDatePicker.bind(this);
  }

  toggleDatePicker() {
    this.setState({
      newTimerFormShown: !this.state.newTimerFormShown,
    });
  }

  render() {
    const addTimerForm = this.state.newTimerFormShown ? <AddTimerForm /> : null;

    return (
      <Container>
        <StyledMain>
          <Header />
          <TimersList />
          <Button onClick={this.toggleDatePicker}>Add Timer</Button>
          {addTimerForm}
          <Footer />
        </StyledMain>
      </Container>
    );
  }
}
