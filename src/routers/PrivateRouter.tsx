import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Favorites, Home, Playlists, Settings} from '../screens';
import {RootState, useAppDispatch} from '../redux/store';
import {fetchAllDataMusic} from '../redux/musicData';
import {useSelector} from 'react-redux';

const PrivateRouter = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useAppDispatch();
  const {user} = useSelector((state: RootState) => state);
  useEffect(() => {
    dispatch(fetchAllDataMusic({assessToken: user.accessToken}));
  }, []);

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default PrivateRouter;
