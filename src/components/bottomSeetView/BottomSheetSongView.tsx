import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ISong} from '../../types';
import {COLOR} from '../../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shortstring, toHHMMSS} from '../../utils';

const BottomSheetSongView = ({el}: {el: ISong}) => {
  const handleAddFavorite = (id: string) => {};

  return (
    <View style={{paddingHorizontal: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 84,
          marginBottom: 10,
        }}>
        <Image
          source={{uri: el.image}}
          style={{width: 75, height: 75, borderRadius: 16}}
        />
        <View style={{flex: 1, marginLeft: 10}}>
          <Text style={{color: COLOR.black, fontWeight: '700', fontSize: 15}}>
            {shortstring(el.title, 16)}
          </Text>
          <Text
            style={{
              color: COLOR.gray,
              fontSize: 12,
              marginTop: 4,
            }}>
            {`${shortstring(el.artist.name, 14)}  `} |{' '}
            {`  ${toHHMMSS(el.time)}`} mins
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => handleAddFavorite(el._id)}
            style={{
              height: 32,
              width: 32,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 32,
            }}>
            <Ionicons name={'heart-outline'} size={28} color={COLOR.black} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{borderTopColor: COLOR.gray1, borderTopWidth: 1}}></View>
    </View>
  );
};

export default BottomSheetSongView;
//<ion-icon name="heart-outline"></ion-icon>
const styles = StyleSheet.create({});
