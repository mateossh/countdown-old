import React from 'react';
import styled from 'styled-components';

const Header = (props) => (
  <h1 {...props}><i data-eva="clock-outline" data-eva-fill="#5e81ac" /> Countdown</h1>
);

const StyledHeader = styled(Header)`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 48px 0;

  & > svg {
    transform: translateY(2px);
  }
`;

export default StyledHeader;
