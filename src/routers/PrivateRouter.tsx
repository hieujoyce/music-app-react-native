import React, {useEffect, useRef, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DetailAlbum,
  DetailArtist,
  Favorites,
  Home,
  ListenMusic,
  Playlists,
  Settings,
} from '../screens';
import {RootState, useAppDispatch} from '../redux/store';
import {fetchAllDataMusic} from '../redux/musicData';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomSheetCustom from '../components/bottomSeetView/BottomSheetCustom';

const PrivateRouter = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();
  const {user} = useSelector((state: RootState) => state);
  useEffect(() => {
    dispatch(fetchAllDataMusic({assessToken: user.accessToken}));
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Root"
            component={BottomNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="ListenMusic" component={ListenMusic} />
          <Stack.Screen name="DetailArtist" component={DetailArtist} />
          <Stack.Screen name="DetailAlbum" component={DetailAlbum} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomSheetCustom />
    </>
  );
};

export default PrivateRouter;

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'ios-information-circle';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'heart';
          } else if (route.name === 'Playlists') {
            iconName = 'list';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: 56,
        },
        tabBarLabelStyle: {
          paddingBottom: 6,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Playlists" component={Playlists} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
