import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  return (
    <input {...props} />
  );
};

const StyledInput = styled(Input)`
  width: 280px;
  font-size: 1.2em;
  padding: 0.25em 0.45em;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #5e81ac;
`;

export default StyledInput;
