import React from 'react';
import styled from 'styled-components';

const Header = (props) => (
  <h1 {...props}>⏲ Countdown</h1>
);

const StyledHeader = styled(Header)`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 48px 0;
`;

export default StyledHeader;
