import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Routers from './src/routers/Routers';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <Routers />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
