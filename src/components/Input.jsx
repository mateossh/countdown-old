import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  return (
    <input {...props} />
  );
};

const StyledInput = styled(Input)`
  width: 300px;
  box-sizing: border-box;
  font-size: 1.2rem;
  padding: 0.3rem 0.5rem;
  margin: 6px 0;
  background: transparent;
  color: #6e778a;
  border: ${props => props.invalid ? "2px solid #bf616a" : "2px solid #d8dee9"}
  border-radius: 3px;
  outline: 0;
  transition: .1s ease-in-out;
  ::placeholder {
    color: #d8dee9;
  }
  :active, :focus {
    border: 2px solid #5e81ac;
  }
`;

export default StyledInput;
