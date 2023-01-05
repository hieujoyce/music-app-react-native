import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyStorage} from './src/types';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import PublicRouter from './src/routers/PublicRouter';
import PrivateRouter from './src/routers/PrivateRouter';

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const checkAccessToken = async () => {
    try {
      const accessToken = await AsyncStorage.getItem(KeyStorage.ACCESS_TOKEN);
      if (accessToken !== null) {
        // value previously stored
        setIsLogin(false);
      }
      setIsLogin(false);
    } catch (e) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    //checkAccessToken();
  }, []);

  return (
    //<Provider store={store}>
    <>
      {!isLogin ? <PublicRouter /> : <PrivateRouter />}
      <Toast />
    </>
    //</Provider>
  );
};

export default App;
