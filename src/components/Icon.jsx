import React from 'react';
import { icons } from 'eva-icons';

const Icon = (props) => (
  <span dangerouslySetInnerHTML={{__html: icons[props.icon].toSvg()}}></span>
);

export default Icon;
