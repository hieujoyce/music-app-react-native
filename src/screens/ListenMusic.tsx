import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLOR} from '../types/const';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Slider from '@react-native-community/slider';

const ListenMusic = ({navigation}: {navigation: any}) => {
  const {listeningMusic} = useSelector((state: RootState) => state);

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
      {listeningMusic.target && (
        <View style={{paddingHorizontal: 20}}>
          <Image
            source={{uri: listeningMusic.target.image}}
            style={{width: '100%', height: 300, borderRadius: 30}}
          />
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: COLOR.black,
              alignSelf: 'center',
              marginTop: 10,
            }}>
            {listeningMusic.target.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: COLOR.black,
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 5,
            }}>
            {listeningMusic.target.artist.name}
          </Text>
          <View
            style={{
              height: 90,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Slider
              style={{width: '100%', height: 40}}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={COLOR.primary}
              maximumTrackTintColor={'#bbbbbb'}
              thumbTintColor={COLOR.primary}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <View>
                <Text style={{color: COLOR.black}}>00.00</Text>
              </View>
              <View>
                <Text style={{color: COLOR.black}}>00.30</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <Ionicons name={'play-skip-back'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name={'play-back'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLOR.primary,
              }}>
              <Ionicons
                name={'caret-forward-outline'}
                size={36}
                color={COLOR.white}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name={'play-forward'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name={'play-skip-forward'}
                size={28}
                color={COLOR.black}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: 70,
              alignItems: 'center',
              paddingHorizontal: 40,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
              <Ionicons name={'radio-outline'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name={'alarm-outline'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name={'share-social-outline'}
                size={28}
                color={COLOR.black}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name={'ellipsis-vertical-outline'}
                size={28}
                color={COLOR.black}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity>
              <Ionicons
                name={'chevron-up-outline'}
                size={28}
                color={COLOR.black}
              />
            </TouchableOpacity>
            <Text style={{color: COLOR.black, fontWeight: '700'}}>Lyrics</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ListenMusic;

const styles = StyleSheet.create({});
//<ion-icon name="chevron-up-outline"></ion-icon>
//<ion-icon name="arrow-back-outline"></ion-icon>
//<ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon>
//<ion-icon name="caret-forward-outline"></ion-icon>
//<ion-icon name="pause-outline"></ion-icon>

//<ion-icon name="play-back"></ion-icon>
//<ion-icon name="play-forward"></ion-icon>
//<ion-icon name="play-skip-back"></ion-icon>
//<ion-icon name="play-skip-forward"></ion-icon>

//<ion-icon name="radio-outline"></ion-icon>
//<ion-icon name="alarm-outline"></ion-icon>
//<ion-icon name="share-social-outline"></ion-icon>
//<ion-icon name="ellipsis-vertical-outline"></ion-icon>
