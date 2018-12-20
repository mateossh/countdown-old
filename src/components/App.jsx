import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import TimersList from './TimersList.jsx';
import AddTimerForm from './AddTimerForm.jsx';
import Footer from './Footer.jsx';
import Button from './Button.jsx';
import { retrieveData, storeData } from '../utils';

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [],
      newTimerFormShown: false,
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.fetchTimers = this.fetchTimers.bind(this);
    this.deleteTimer = this.deleteTimer.bind(this);
  }

  toggleForm() {
    this.setState({ newTimerFormShown: !this.state.newTimerFormShown });
  }

  fetchTimers() {
    const timers = retrieveData('timers');
    this.setState({ timers });
  }

  deleteTimer(timer) {
    const timers = this.state.timers.filter(t => t.id !== timer);
    this.setState({ timers });
  }

  componentWillMount() {
    this.fetchTimers();
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentDidUpdate() {
    storeData("timers", this.state.timers);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const addTimerForm = this.state.newTimerFormShown
          ? <AddTimerForm updateList={this.fetchTimers} toggleForm={this.toggleForm} />
          : null;

    return (
      <Container>
        <StyledMain>
          <Header />
          <TimersList timers={this.state.timers} deleteTimer={this.deleteTimer}/>
          <ButtonWrapper>
            <Button onClick={this.toggleForm}>Add Timer</Button>
          </ButtonWrapper>
          {addTimerForm}
          <Footer />
        </StyledMain>
      </Container>
    );
  }
}
