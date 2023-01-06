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

const AlbumsView = () => {
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
          {musicData.albums.total} albums
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
            Date Modified
          </Text>
          <Ionicons
            name={'swap-vertical-outline'}
            size={20}
            color={COLOR.primary}
          />
        </View>
      </View>
      <ScrollView
        style={{
          marginBottom: 170,
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {musicData.albums.data.map((el, i) => {
            return (
              <TouchableOpacity
                key={el._id}
                style={[
                  {
                    marginVertical: 5,
                    width: '48%',
                  },
                  i % 2 === 0 ? {} : {marginLeft: 'auto'},
                ]}>
                <Image
                  source={{uri: el.image}}
                  style={{width: '100%', height: 158, borderRadius: 20}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginTop: 4,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: COLOR.black,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      {shortstring(el.title, 13)}
                    </Text>
                    <Text
                      style={{
                        color: COLOR.gray,
                        fontSize: 12,
                        marginTop: 4,
                      }}>
                      {shortstring(el.label, 11)}
                      {'  '}|{'  '}
                      {el.releaseDate.slice(0, 4)}
                    </Text>
                    <Text
                      style={{
                        color: COLOR.gray,
                        fontSize: 12,
                        marginTop: 4,
                        marginBottom: 6,
                      }}>
                      {el.songsAmount} songs
                    </Text>
                  </View>
                  <Ionicons
                    name={'ellipsis-vertical-outline'}
                    size={18}
                    color={COLOR.black}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default AlbumsView;

const styles = StyleSheet.create({});
