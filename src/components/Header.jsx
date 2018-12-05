import React from 'react';
import styled from 'styled-components';
import Icon from './Icon.jsx';

const Header = (props) => (
  <h1 {...props}><StyledIcon icon="clock-outline" /> Countdown</h1>
);

const StyledHeader = styled(Header)`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 48px 0;
`;

const StyledIcon = styled(Icon)`
  fill: #5e81ac;

  & > svg {
    transform: translateY(2px);
  }
`;

export default StyledHeader;
