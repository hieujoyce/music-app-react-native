import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch} from '../redux/store';
import {logOut} from '../redux/user.slice';

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useAppDispatch();

  let menu = [
    {
      leftIcon: 'cloud-upload-outline',
      ctx: 'Backup',
      rightIcon: 'chevron-forward-outline',
    },
    {
      leftIcon: 'notifications-outline',
      ctx: 'Notification',
      rightIcon: 'chevron-forward-outline',
    },
    {
      leftIcon: 'language-outline',
      ctx: 'Language',
      rightIcon: 'chevron-forward-outline',
      rightMsg: 'English(US)',
    },
    {leftIcon: 'eye-outline', ctx: 'Dark Mode', rightIcon: 'switch'},
    {
      leftIcon: 'paper-plane-outline',
      ctx: 'Share App ',
      rightIcon: 'chevron-forward-outline',
    },
    {
      leftIcon: 'newspaper-outline',
      ctx: 'Change Log',
      rightIcon: 'chevron-forward-outline',
    },
    {
      leftIcon: 'shield-checkmark-outline',
      ctx: 'Privacy Policy',
      rightIcon: 'chevron-forward-outline',
    },
    {
      leftIcon: 'alert-circle-outline',
      ctx: 'FAQ',
      rightIcon: 'chevron-forward-outline',
    },
    {
      leftIcon: 'log-out-outline',
      ctx: 'Quit',
      handlePress: () => dispatch(logOut()),
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.white}}>
      <View
        style={{
          height: 70,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <View
          style={{flexDirection: 'row', height: 36, alignItems: 'flex-end'}}>
          <Ionicons
            name={'musical-notes-outline'}
            size={30}
            color={COLOR.primary}
          />
          <Text
            style={{
              color: COLOR.black,
              fontWeight: '700',
              fontSize: 22,
              marginLeft: 8,
            }}>
            Settings
          </Text>
        </View>
        <Ionicons
          name={'ellipsis-horizontal-circle-outline'}
          size={30}
          color={COLOR.black}
        />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Image
          source={require('../images/premium.png')}
          style={{width: '100%', height: 160}}
        />
      </View>
      <View style={{paddingHorizontal: 20}}>
        {menu.map((el, i) => {
          return (
            <TouchableOpacity
              onPress={el.handlePress}
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 47,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Ionicons name={el.leftIcon} size={28} color={COLOR.black} />
                <Text
                  style={{
                    color: COLOR.black,
                    fontSize: 15,
                    fontWeight: '600',
                    marginLeft: 12,
                  }}>
                  {el.ctx}
                </Text>
              </View>
              {el.rightIcon && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLOR.black,
                      fontSize: 15,
                      fontWeight: '600',
                      marginRight: 4,
                    }}>
                    {el.rightMsg}
                  </Text>
                  {el.rightIcon !== 'switch' ? (
                    <Ionicons
                      name={el.rightIcon}
                      size={20}
                      color={COLOR.black}
                    />
                  ) : (
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={COLOR.primary}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Settings;
//<ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
//<ion-icon name="chevron-forward-outline"></ion-icon>
//<ion-icon name="cloud-upload-outline"></ion-icon>
//<ion-icon name="notifications-outline"></ion-icon>
//<ion-icon name="language-outline"></ion-icon>
//<ion-icon name="eye-outline"></ion-icon>
//<ion-icon name="paper-plane-outline"></ion-icon>
//<ion-icon name="newspaper-outline"></ion-icon>
//<ion-icon name="shield-checkmark-outline"></ion-icon>
//<ion-icon name="alert-circle-outline"></ion-icon>
//<ion-icon name="log-out-outline"></ion-icon>
const styles = StyleSheet.create({});
