import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const Routers = () => {
  const {notify, user} = useSelector((state: RootState) => state);
  let isLogin = user.accessToken && user.data;
  // const checkAccessToken = async () => {
  //   try {
  //     const accessToken = await AsyncStorage.getItem(KeyStorage.ACCESS_TOKEN);
  //     if (accessToken !== null) {
  //       // value previously stored
  //       setIsLogin(false);
  //     }
  //     setIsLogin(false);
  //   } catch (e) {
  //     setIsLogin(false);
  //   }
  // };

  useEffect(() => {
    //checkAccessToken();
    if (notify.msg) {
      Toast.show({
        type: notify.msg.type,
        text1: notify.msg.type,
        text2: notify.msg.data,
      });
    }
  }, [notify.msg]);
  return (
    <>
      {!isLogin ? <PublicRouter /> : <PrivateRouter />}
      <Toast />
      <Spinner
        visible={notify.loading}
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
    </>
  );
};

export default Routers;

const styles = StyleSheet.create({});
