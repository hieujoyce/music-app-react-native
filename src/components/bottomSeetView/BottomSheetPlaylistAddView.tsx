import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLOR} from '../../types/const';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {closeModelBottomSheet} from '../../redux/modelBottomSheet';
import {createPlayList} from '../../redux/user.slice';
import Toast from 'react-native-toast-message';

const BottomSheetPlaylistAddView = () => {
  const {user} = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const inputRef = useRef<any>(null);
  function onSubmit() {
    dispatch(createPlayList({accessToken: user.accessToken, name: name}))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'success',
          text2: 'Đã tạo playlist thành công.',
        });
      })
      .finally(() => {
        dispatch(closeModelBottomSheet());
      });
  }
  return (
    <View style={{paddingHorizontal: 20}}>
      <View
        style={{
          borderBottomColor: COLOR.gray1,
          borderBottomWidth: 1,
          paddingBottom: 10,
        }}>
        <Text
          style={{
            color: COLOR.black,
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: '700',
          }}>
          New Playlist
        </Text>
      </View>
      <View
        style={{
          borderTopColor: COLOR.gray1,
          borderTopWidth: 1,
          borderBottomColor: COLOR.gray1,
          borderBottomWidth: 1,
        }}>
        <BottomSheetTextInput
          ref={inputRef}
          value={name}
          onChangeText={setName}
          style={{
            alignSelf: 'stretch',
            marginTop: 15,
            marginBottom: 15,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            backgroundColor: COLOR.gray1,
            color: COLOR.black,
            textAlign: 'left',
          }}
          placeholder={'Enter your playlist'}
          placeholderTextColor={COLOR.gray}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        <TouchableOpacity
          onPress={() => {
            inputRef.current.blur();
            setTimeout(() => {
              dispatch(closeModelBottomSheet());
            }, 200);
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 154,
            paddingVertical: 14,
            backgroundColor: '#FFF3E8',
            borderRadius: 200,
          }}>
          <Text
            style={{
              color: COLOR.primary,
              marginLeft: 10,
              fontWeight: '700',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 154,
            paddingVertical: 14,
            backgroundColor: COLOR.primary,
            borderRadius: 200,
            elevation: 20,
            shadowColor: COLOR.primary,
          }}>
          <Text style={{color: COLOR.white, marginLeft: 10, fontWeight: '700'}}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomSheetPlaylistAddView;
