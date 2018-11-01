import React from 'react';
import styled from 'styled-components';

const Footer = ({className}) => (
  <footer className={className}>
    Created by Mateusz Żochowski
  </footer>
);

const StyledFooter = styled(Footer)`
  text-align: center;
  font-size: 0.8em;
  font-weight: 400;
  text-align: center;
  margin: 24px 0;
`;

export default StyledFooter;
