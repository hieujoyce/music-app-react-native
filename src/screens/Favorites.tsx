import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {shortstring, toHHMMSS} from '../utils';

const Favorites = () => {
  const {user} = useSelector((state: RootState) => state);
  console.log(user.data);

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
            Favorites
          </Text>
        </View>
        <Ionicons name={'search-outline'} size={30} color={COLOR.black} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
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
          <Ionicons name={'shuffle-outline'} size={20} color={COLOR.white} />
          <Text style={{color: COLOR.white, marginLeft: 10, fontWeight: '700'}}>
            Shuffle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: 154,
            paddingVertical: 14,
            backgroundColor: '#FFF3E8',
            borderRadius: 200,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
              width: 24,
              borderRadius: 24,
              backgroundColor: COLOR.primary,
            }}>
            <Ionicons
              name={'caret-forward-outline'}
              size={14}
              color={COLOR.white}
            />
          </View>
          <Text
            style={{
              color: COLOR.primary,
              marginLeft: 10,
              fontWeight: '700',
            }}>
            Play
          </Text>
        </TouchableOpacity>
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
          {user.data?.favorites.length} favorites
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
            Date Added
          </Text>
          <Ionicons
            name={'swap-vertical-outline'}
            size={20}
            color={COLOR.primary}
          />
        </View>
      </View>
      {user.data?.favorites.length === 0 ? (
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
            You don't have a favorite song yet?
          </Text>
          <Text style={{color: COLOR.black}}>
            Let's go find your favorite song
          </Text>
        </View>
      ) : (
        <FlatList
          style={{paddingHorizontal: 20, flex: 1, paddingBottom: 170}}
          data={user.data?.favorites}
          renderItem={({item: el}) => (
            <TouchableOpacity
              onPress={() => {
                // dispatch(addTarget({target: el, type: 'songs'}));
                // navigation.navigate('ListenMusic');
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
                  {`${shortstring('Sơn Tùng MTP', 14)}  `} |{' '}
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

export default Favorites;

const styles = StyleSheet.create({});
//<ion-icon name="sad-outline"></ion-icon>
