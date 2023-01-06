import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLOR} from '../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../redux/store';
import {IArtist} from '../types';
import {getDeialArtist} from '../redux/detailArtist.slice';
import {shortstring, toHHMMSS} from '../utils';
import {addTarget} from '../redux/listeningMusic.slice';

const DetailArtist = ({route, navigation}: {route: any; navigation: any}) => {
  const [dataDetailArtist, setDataDetailArtist] = useState<IArtist | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const {artistId} = route.params;
  const {detailArtist, user} = useSelector((state: RootState) => state);
  useEffect(() => {
    const findIndex = detailArtist.findIndex(el => el._id === artistId);
    if (findIndex !== -1) {
      setDataDetailArtist(detailArtist[findIndex]);
    } else {
      dispatch(getDeialArtist({id: artistId, assessToken: user.accessToken}));
    }
  }, [detailArtist.length]);

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', height: 36, alignItems: 'flex-end'}}>
          <Ionicons name={'arrow-back-outline'} size={28} color={COLOR.black} />
        </TouchableOpacity>
        <Ionicons
          name={'ellipsis-horizontal-circle-outline'}
          size={28}
          color={COLOR.black}
        />
      </View>
      {dataDetailArtist && (
        <View style={{paddingHorizontal: 20}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: dataDetailArtist.image}}
              style={{width: 180, height: 180, borderRadius: 30}}
            />
          </View>
          <Text
            style={{
              color: COLOR.black,
              alignSelf: 'center',
              fontWeight: '700',
              fontSize: 22,
              marginTop: 8,
            }}>
            {dataDetailArtist.name}
          </Text>
          <Text style={{color: COLOR.gray, alignSelf: 'center', marginTop: 8}}>
            {dataDetailArtist.ablumsAmount}
            {' Albums  |  '}
            {dataDetailArtist.songsAmount}
            {' Songs  |  '}
            {toHHMMSS(dataDetailArtist.time as number)}
            {' mins'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
              paddingBottom: 24,
              borderBottomWidth: 1,
              borderColor: COLOR.gray1,
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
              <Ionicons
                name={'shuffle-outline'}
                size={20}
                color={COLOR.white}
              />
              <Text
                style={{color: COLOR.white, marginLeft: 10, fontWeight: '700'}}>
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 14,
              marginBottom: 14,
            }}>
            <Text style={{color: COLOR.black, fontSize: 20, fontWeight: '700'}}>
              Songs
            </Text>
            <Text
              style={{color: COLOR.primary, fontSize: 16, fontWeight: '700'}}>
              See all
            </Text>
          </View>
          <ScrollView style={{height: 280}}>
            {(dataDetailArtist.songs as any).map((el: any, i: number) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(addTarget({target: el, type: 'artist'}));
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
                      style={{
                        color: COLOR.black,
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
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
        </View>
      )}
    </SafeAreaView>
  );
};

export default DetailArtist;

const styles = StyleSheet.create({});
//<ion-icon name="shuffle-outline"></ion-icon>
//<ion-icon name="caret-forward-outline"></ion-icon>
