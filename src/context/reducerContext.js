import React from 'react';

const ReducerContext = React.createContext({
  state: {},
  dispach: () => {}
});

ReducerContext.displayName = 'ReducerContext';

export default ReducerContext;
