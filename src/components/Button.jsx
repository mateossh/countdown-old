import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>{props.children}</button>
  );
};

// const Button = ({className, children}) => (
//   <button className={className}>{children}</button>
// );

const StyledButton = styled(Button)`
  font-size: 1em;
  margin: 1em;
  padding: 0.35em 1.2em;
  border: 2px solid #5e81ac;
  border-radius: 3px;
  background-color: transparent;
  color: #5e81ac;
  font-weight: 500;
`;

export default StyledButton;
