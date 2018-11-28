import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: #5e81ac;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledFooter = styled.footer`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  margin: 24px 0;
`;

const Footer = (props) => (
  <StyledFooter {...props}>
    Created by Mateusz Żochowski.
    <br />
    Source code is <Link href="https://github.com/mateossh/countdown">here</Link>
  </StyledFooter>
);

export default Footer;
