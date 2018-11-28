import React from 'react';
import styled from 'styled-components';

const Button = (props) => (
  <div {...props}>{props.children}</div>
);

const StyledButton = styled(Button)`
  display: inline-block;
  font-size: 1em;
  font-weight: 500;
  margin: 1em;
  padding: 0.35em 1.2em;
  border: 2px solid #5e81ac;
  border-radius: 3px;
  background-color: transparent;
  color: #5e81ac;
  cursor: default;
`;

export default StyledButton;
