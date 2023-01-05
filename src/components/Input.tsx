import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import {COLOR} from '../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  lable: string;
  iconName: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  passwordField?: boolean;
}

const Input: FC<Props> = ({
  lable,
  iconName,
  value,
  setValue,
  passwordField = false,
}) => {
  const [isFocus, setIsFoces] = useState<boolean>(false);
  const [showPw, setShowPw] = useState<boolean>(false);

  return (
    <View
      style={[
        {
          backgroundColor: COLOR.gray1,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 6,
          paddingHorizontal: 10,
          borderWidth: 2,
          borderColor: 'transparent',
          marginBottom: 4,
        },
        isFocus && {borderColor: COLOR.primary},
      ]}>
      <Ionicons
        name={iconName}
        size={30}
        color={isFocus ? COLOR.primary : COLOR.gray}
        style={{marginRight: 6}}
      />
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={lable}
        style={{color: COLOR.black, flex: 1}}
        placeholderTextColor={COLOR.gray}
        secureTextEntry={passwordField && !showPw}
        onFocus={() => setIsFoces(true)}
        onBlur={() => setIsFoces(false)}
      />
      {passwordField && (
        <>
          {showPw ? (
            <TouchableOpacity onPress={() => setShowPw(!showPw)}>
              <Ionicons
                name="eye-off"
                size={30}
                color={isFocus ? COLOR.primary : COLOR.gray}
                style={{marginRight: 6}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowPw(!showPw)}>
              <Ionicons
                name="eye"
                size={30}
                color={isFocus ? COLOR.primary : COLOR.gray}
                style={{marginRight: 6}}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
