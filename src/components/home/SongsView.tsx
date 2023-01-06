import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {COLOR} from '../../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shortstring, toHHMMSS} from '../../utils';

const SongsView = () => {
  const {musicData} = useSelector((state: RootState) => state);

  return (
    <>
      <View
        style={{
          height: 54,
          marginHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#EBEBEB',
        }}>
        <Text style={{color: COLOR.black, fontWeight: '700', fontSize: 18}}>
          {musicData.songs.total} songs
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLOR.primary,
              fontWeight: '700',
              fontSize: 15,
              marginRight: 6,
            }}>
            Ascending
          </Text>
          <Ionicons
            name={'swap-vertical-outline'}
            size={20}
            color={COLOR.primary}
          />
        </View>
      </View>
      <ScrollView style={{marginBottom: 170, paddingHorizontal: 20}}>
        {musicData.songs.data.map((el, i) => {
          return (
            <TouchableOpacity
              key={el._id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 84,
                marginVertical: 2,
              }}>
              <Image
                source={{uri: el.image}}
                style={{width: 75, height: 75, borderRadius: 16}}
              />
              <View style={{flex: 1, marginLeft: 10}}>
                <Text
                  style={{color: COLOR.black, fontWeight: '700', fontSize: 15}}>
                  {shortstring(el.title, 18)}
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
                <View
                  style={{
                    marginRight: 10,
                    height: 32,
                    width: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLOR.primary,
                    borderRadius: 32,
                  }}>
                  <Ionicons
                    name={'caret-forward-outline'}
                    size={18}
                    color={COLOR.white}
                  />
                </View>
                <Ionicons
                  name={'ellipsis-vertical-outline'}
                  size={20}
                  color={COLOR.black}
                />
              </View>
              {/* <Text style={{color: '#000000'}}>{el.title}</Text> */}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default SongsView;
//<ion-icon name="swap-vertical-outline"></ion-icon>
//<ion-icon name="caret-forward-outline"></ion-icon>;
//<ion-icon name="ellipsis-vertical-outline"></ion-icon>
const styles = StyleSheet.create({});
