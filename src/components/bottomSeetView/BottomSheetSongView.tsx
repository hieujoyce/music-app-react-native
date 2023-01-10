import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {ISong} from '../../types';
import {COLOR} from '../../types/const';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shortstring, toHHMMSS} from '../../utils';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {addFavorites, deleteFavorites} from '../../redux/user.slice';
import Toast from 'react-native-toast-message';
import {closeModelBottomSheet} from '../../redux/modelBottomSheet';

const BottomSheetSongView = ({el}: {el: ISong}) => {
  const {user} = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const handleAddFavorite = (id: string) => {
    setLoading(true);
    dispatch(addFavorites({idSong: id, accessToken: user.accessToken}))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'success',
          text2: 'Đã thêm bài hát vào favorites.',
        });
        // dispatch(closeModelBottomSheet());
      })
      .finally(() => setLoading(false));
  };
  const handleDeleteFavorite = (id: string) => {
    setLoading(true);
    dispatch(deleteFavorites({idSong: id, accessToken: user.accessToken}))
      .unwrap()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'success',
          text2: 'Đã xóa bài hát khỏi favorites.',
        });
        // dispatch(closeModelBottomSheet());
      })
      .catch()
      .finally(() => setLoading(false));
  };

  function isCheckInFavorites(id: string) {
    return user.data?.favorites.some(el => el._id === id);
  }

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
          {loading ? (
            <>
              <ActivityIndicator size={28} color={COLOR.primary} />
            </>
          ) : isCheckInFavorites(el._id) ? (
            <TouchableOpacity
              onPress={() => handleDeleteFavorite(el._id)}
              style={{
                height: 32,
                width: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 32,
              }}>
              <Ionicons name={'heart'} size={28} color={COLOR.primary} />
            </TouchableOpacity>
          ) : (
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
          )}
        </View>
      </View>
      <View style={{borderTopColor: COLOR.gray1, borderTopWidth: 1}}></View>
    </View>
  );
};

export default BottomSheetSongView;
//<ion-icon name="heart-outline"></ion-icon>
const styles = StyleSheet.create({});
