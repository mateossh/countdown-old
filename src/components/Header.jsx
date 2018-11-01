import React from 'react';
import styled from 'styled-components';

const Header = (props) => {
  let asd = null;

  asd = props.sth ? true : false;

  return (
    <h1 className={props.className}>countdown</h1>
  );
};

// const Header = ({className, children}) => (
//   <h1 className={className}>doopa</h1>
// );

const StyledHeader = styled(Header)`
  font-size: 1.75em;
  font-weight: 700;
  margin: 0 0 36px 0;
`;

export default StyledHeader;
