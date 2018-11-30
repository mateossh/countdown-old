import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  return (
    <input {...props} />
  );
};

const StyledInput = styled(Input)`
  width: 280px;
  font-size: 1.2rem;
  padding: 0.25rem 0.45rem;
  margin: 6px 0;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #5e81ac;
  outline: 0;
`;

export default StyledInput;
