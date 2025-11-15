import React from 'react';

const DefaultWrapper = ({ style, children }) => {
  return <div
  style={Object.assign({position : 'relative', paddingBottom: '8px', width:'100%'}, style)}>
  {children}
  </div>;
};

export default DefaultWrapper;
