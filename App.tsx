import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {RootState, store} from './src/redux/store';
import Routers from './src/routers/Routers';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routers />
    </Provider>
  );
};

export default App;
