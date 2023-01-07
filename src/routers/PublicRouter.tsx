import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Register} from '../screens';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Sound from 'react-native-sound';

const PublicRouter = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register as any} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

type RootStackParamList = {
  Login: any;
  Register: any;
};

export type PropsPublicRouter = NativeStackScreenProps<RootStackParamList>;

export default PublicRouter;
