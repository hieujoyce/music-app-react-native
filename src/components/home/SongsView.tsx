import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {COLOR, quantityPerPage} from '../../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shortstring, toHHMMSS} from '../../utils';
import {addTarget} from '../../redux/listeningMusic.slice';
import {fetchMoreSongs} from '../../redux/musicData';
import {openModelBottomSheet} from '../../redux/modelBottomSheet';

const SongsView = ({navigation}: {navigation: any}) => {
  const {musicData, user} = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <FlatList
        style={{paddingBottom: 170, paddingHorizontal: 20}}
        data={musicData.songs.data}
        renderItem={({item: el}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(addTarget({target: el, type: 'songs'}));
              navigation.navigate('ListenMusic');
            }}
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
              <TouchableOpacity
                style={{
                  height: 32,
                  width: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 32,
                }}
                onPress={() =>
                  dispatch(openModelBottomSheet({type: 'song', el: el}))
                }>
                <Ionicons
                  name={'ellipsis-vertical-outline'}
                  size={20}
                  color={COLOR.black}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => {
          if (isLoading) {
            return (
              <View
                style={{
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={COLOR.primary} />
              </View>
            );
          }
          return (
            <View
              style={{
                height: 10,
              }}></View>
          );
        }}
        onEndReachedThreshold={0}
        onEndReached={() => {
          if (musicData.songs.data.length === musicData.songs.total) {
            setIsLoading(false);
            return;
          }
          dispatch(
            fetchMoreSongs({
              assessToken: user.accessToken,
              page: musicData.songs.data.length / quantityPerPage + 1,
            }),
          );
        }}
        keyExtractor={item => item._id}
      />
    </>
  );
};

export default SongsView;

const styles = StyleSheet.create({});

{
  /* <ScrollView style={{marginBottom: 170, paddingHorizontal: 20}}>
        {musicData.songs.data.map((el, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(addTarget({target: el, type: 'songs'}));
                navigation.navigate('ListenMusic');
              }}
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
              {/* <Text style={{color: '#000000'}}>{el.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView> */
}
