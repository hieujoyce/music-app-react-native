import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../redux/store';
import {shortstring, toHHMMSS} from '../utils';
import {openModelBottomSheet} from '../redux/modelBottomSheet';

const Playlists = () => {
  const {user} = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
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
            Playlists
          </Text>
        </View>
        <Ionicons name={'search-outline'} size={30} color={COLOR.black} />
      </View>
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
          {10} playlists
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
            Recently Added
          </Text>
          <Ionicons
            name={'swap-vertical-outline'}
            size={20}
            color={COLOR.primary}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginVertical: 10}}>
        <TouchableOpacity
          onPress={() => {
            dispatch(openModelBottomSheet({type: 'playlistAdd', el: null}));
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 84,
            marginVertical: 2,
          }}>
          <View
            style={{
              width: 75,
              height: 75,
              borderRadius: 75,
              backgroundColor: COLOR.primary,
              elevation: 20,
              shadowColor: COLOR.primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name={'add-outline'} size={30} color={COLOR.white} />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{color: COLOR.black, fontWeight: '700', fontSize: 15}}>
              Add New Playlist
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {user.data?.playlists.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}>
          <Ionicons
            name={'sad-outline'}
            size={100}
            color={COLOR.black}
            style={{marginBottom: 10}}
          />
          <Text
            style={{
              color: COLOR.black,
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 10,
            }}>
            You don't have a playlist yet?
          </Text>
          <Text style={{color: COLOR.black}}>
            Let's go create your playlist.
          </Text>
        </View>
      ) : (
        <FlatList
          style={{paddingHorizontal: 20, flex: 1, paddingBottom: 170}}
          data={user.data?.playlists}
          renderItem={({item: el}) => (
            <TouchableOpacity
              onPress={() => {
                // dispatch(addTarget({target: el, type: 'songs'}));
                // navigation.navigate('ListenMusic');
              }}
              key={el.name}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 84,
                marginVertical: 2,
              }}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/5699509/pexels-photo-5699509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                }}
                style={{width: 75, height: 75, borderRadius: 16}}
              />
              <View style={{flex: 1, marginLeft: 10}}>
                <Text
                  style={{color: COLOR.black, fontWeight: '700', fontSize: 15}}>
                  {shortstring(el.name, 18)}
                </Text>
                <Text
                  style={{
                    color: COLOR.gray,
                    fontSize: 12,
                    marginTop: 4,
                  }}>
                  {`${el.count}`} songs
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    height: 32,
                    width: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 32,
                  }}
                  // onPress={() =>
                  //   dispatch(openModelBottomSheet({type: 'song', el: el}))
                  // }
                >
                  <Ionicons
                    name={'ellipsis-vertical-outline'}
                    size={20}
                    color={COLOR.black}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        />
      )}
    </SafeAreaView>
  );
};

export default Playlists;
//<ion-icon name="add-outline"></ion-icon>
const styles = StyleSheet.create({});
