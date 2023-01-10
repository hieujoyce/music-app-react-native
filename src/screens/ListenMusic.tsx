import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR} from '../types/const';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../redux/store';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import {addTarget} from '../redux/listeningMusic.slice';
import {shortstring, toHHMMSS} from '../utils';

const ListenMusic = ({navigation}: {navigation: any}) => {
  const {listeningMusic, musicData, detailArtist, detailAlbum} = useSelector(
    (state: RootState) => state,
  );
  const [sound, setSound] = useState<any>(null);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [tmp, setTmp] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [valueSlider, setValueSicer] = useState(0);
  const [secondsTime, setSecondsTime] = useState(0);

  const play = () => {
    if (sound) {
      sound.play();
      setIsPlay(true);
      let tmp1 = setInterval(() => {
        sound.getCurrentTime((seconds: any) => {
          setValueSicer((seconds / sound.getDuration()) * 100);
          setSecondsTime(Math.round(seconds));
          if (seconds >= sound.getDuration()) {
            next();
          }
        });
      }, 500);
      setTmp(tmp1);
    } else {
      let sound1 = new Sound(listeningMusic.target?.src, '', error => {
        if (error) {
          return;
        }

        sound1.play();
        let tmp1 = setInterval(() => {
          sound1.getCurrentTime(seconds => {
            setValueSicer((seconds / sound1.getDuration()) * 100);
            setSecondsTime(Math.round(seconds));
            if (seconds >= sound1.getDuration()) {
              next();
            }
          });
        }, 500);
        setTmp(tmp1);
        setIsPlay(true);
        setSound(sound1);
      });
    }
  };
  const pause = () => {
    if (sound) {
      sound.pause();
      setIsPlay(false);
    }
    if (tmp) {
      clearInterval(tmp);
    }
  };
  const next = () => {
    if (listeningMusic.type === 'songs') {
      let findIndex = musicData.songs.data.findIndex(
        el => el.id === listeningMusic.target?.id,
      );
      findIndex =
        findIndex === musicData.songs.data.length - 1
          ? findIndex
          : findIndex + 1;
      dispatch(
        addTarget({type: 'songs', target: musicData.songs.data[findIndex]}),
      );
    }

    // else if (listeningMusic.type === 'artist') {
    //   let findIndexArtist = detailArtist.findIndex(
    //     el => el._id === listeningMusic.id,
    //   );
    //   if (findIndexArtist !== -1) {
    //     let findIndex = detailArtist[findIndexArtist].songs?.findIndex(
    //       el => el.id === listeningMusic.target?.id,
    //     );
    //     if (findIndex && findIndex !== -1) {
    //       findIndex =
    //         findIndex ===
    //         (detailArtist[findIndexArtist].songs as any).length - 1
    //           ? findIndex
    //           : findIndex + 1;
    //       dispatch(
    //         addTarget({
    //           type: 'artist',
    //           target: musicData.songs.data[findIndex],
    //         }),
    //       );
    //     }
    //   }
    // } else if (listeningMusic.type === 'album') {
    //   let findIndexAlbum = detailAlbum.findIndex(
    //     el => el._id === listeningMusic.id,
    //   );
    //   console.log(findIndexAlbum);

    //   if (findIndexAlbum !== -1) {
    //     let findIndex = detailAlbum[findIndexAlbum].songs?.findIndex(
    //       el => el.id === listeningMusic.target?.id,
    //     );
    //     if (findIndex && findIndex !== -1) {
    //       findIndex =
    //         findIndex ===
    //         (detailAlbum[findIndexAlbum].songsAlbum as any).length - 1
    //           ? findIndex
    //           : findIndex + 1;
    //       dispatch(
    //         addTarget({
    //           type: 'album',
    //           target: (detailAlbum[findIndexAlbum].songsAlbum as any)[
    //             findIndex
    //           ],
    //         }),
    //       );
    //     }
    //   }
    // }
  };
  const back = () => {
    if (listeningMusic.type === 'songs') {
      let findIndex = musicData.songs.data.findIndex(
        el => el.id === listeningMusic.target?.id,
      );
      findIndex = findIndex === 0 ? 0 : findIndex - 1;
      dispatch(
        addTarget({type: 'songs', target: musicData.songs.data[findIndex]}),
      );
    }
  };
  useEffect(() => {
    play();
    return () => {
      if (sound) {
        sound.pause();
        sound.release();
        setSound(null);
      }
      if (tmp) {
        clearTimeout(tmp);
      }
    };
  }, [sound, listeningMusic.target]);
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
          onPress={() => {
            navigation.goBack();
          }}
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
            {shortstring(listeningMusic.target.title, 20)}
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
              maximumValue={100}
              minimumTrackTintColor={COLOR.primary}
              maximumTrackTintColor={'#bbbbbb'}
              thumbTintColor={COLOR.primary}
              // onValueChange={value => {
              //   console.log('hieujoyce', value);
              // }}
              value={valueSlider}
              onSlidingComplete={value => {
                // setValueSicer(valueSlider);
                if (sound) {
                  sound.setCurrentTime((value / 100) * sound.getDuration());
                }
              }}
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
                <Text style={{color: COLOR.black}}>
                  {toHHMMSS(secondsTime)}
                </Text>
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
            <TouchableOpacity onPress={back}>
              <Ionicons name={'play-skip-back'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name={'play-back'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            {!isPlay ? (
              <TouchableOpacity
                onPress={play}
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
            ) : (
              <TouchableOpacity
                onPress={pause}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLOR.primary,
                }}>
                <Ionicons
                  name={'pause-outline'}
                  size={36}
                  color={COLOR.white}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity>
              <Ionicons name={'play-forward'} size={28} color={COLOR.black} />
            </TouchableOpacity>
            <TouchableOpacity onPress={next}>
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
