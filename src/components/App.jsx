import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import TimersList from './TimersList.jsx';
import AddTimerForm from './AddTimerForm.jsx';
import Footer from './Footer.jsx';
import Button from './Button.jsx';
import { getStoredJSON } from '../utils';

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Rubik', sans-serif;
  color: #3b4252;
  position: relative;
`;

const StyledMain = styled.main`
  width: 400px;
  // padding: 48px 0 0 0;
  margin: 0 auto;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTimerFormShown: false,
      shouldListUpdate: false,
    };

    this.toggleDatePicker = this.toggleDatePicker.bind(this);
    this.toggleListUpdate = this.toggleListUpdate.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentWillMount() {
    const timers = getStoredJSON('timers');
    this.setState({ timers });
  }

  toggleDatePicker() {
    this.setState({
      newTimerFormShown: !this.state.newTimerFormShown,
    });
  }

  toggleForm() {
    this.setState({ newTimerFormShown: false });
    console.log('ToggleForm()');
    this.forceUpdate();
  }

  // TODO: it should be solved other way or add setTimeout and change shouldListUpdate state back to false
  toggleListUpdate() {
    this.setState({ shouldListUpdate: !this.state.shouldListUpdate });
    console.log('HandleListUpdate()');
  }

  render() {
    const addTimerForm = this.state.newTimerFormShown
          ? <AddTimerForm updateList={this.toggleListUpdate} toggleForm={this.toggleForm} />
          : null;

    const timersList = this.state.shouldListUpdate
          ? <TimersList update="true" toggleUpdate={this.toggleListUpdate} />
          : <TimersList update="false" toggleUpdate={this.toggleListUpdate} />;

    return (
      <Container>
        <StyledMain>
          <Header />
          {timersList}
          <Button onClick={this.toggleDatePicker}>Add Timer</Button>
          {addTimerForm}
          <Footer />
        </StyledMain>
      </Container>
    );
  }
}
