import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {COLOR} from '../../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shortstring} from '../../utils';
import React from 'react';

const ArtistsView = ({navigation}: {navigation: any}) => {
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
          {musicData.artists.total} artists
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
      <ScrollView style={{marginBottom: 170, paddingHorizontal: 20}}>
        {musicData.artists.data.map((el, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailArtist', {artistId: el._id});
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
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 75,
                  borderWidth: 1,
                  borderColor: '#EBEBEB',
                }}
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
                  {el.ablumsAmount} Albums{'  '}|{'  '} {el.songsAmount} Songs
                </Text>
              </View>
              <Ionicons
                name={'ellipsis-vertical-outline'}
                size={20}
                color={COLOR.black}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default ArtistsView;

const styles = StyleSheet.create({});
