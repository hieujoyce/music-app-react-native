import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import React, {useRef, useMemo, useEffect} from 'react';
import BottomSheet, {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {closeModelBottomSheet} from '../../redux/modelBottomSheet';
import BottomSheetSongView from './BottomSheetSongView';
import {ISong} from '../../types';
import BottomSheetPlaylistAddView from './BottomSheetPlaylistAddView';

const BottomSheetCustom = () => {
  const bottomSheetMolalRef = useRef<BottomSheet>(null);
  const {modelBottomSheet} = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const ComponentView = () => {
    switch (modelBottomSheet.type) {
      case 'song':
        return <BottomSheetSongView el={modelBottomSheet.el as ISong} />;
      case 'playlistAdd':
        return <BottomSheetPlaylistAddView />;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (modelBottomSheet.isShowBottomSheet === false) {
      bottomSheetMolalRef.current?.close();
    }
  }, [modelBottomSheet.isShowBottomSheet]);
  const snapPoints = useMemo(() => {
    let p = '50%';
    if (modelBottomSheet.type === 'playlistAdd') {
      p = '35%';
    } else if (modelBottomSheet.type === 'song') {
      p = '78%';
    }
    return [p];
  }, [modelBottomSheet.type]);

  return (
    <BottomSheet
      keyboardBlurBehavior="restore"
      enablePanDownToClose={false}
      backgroundStyle={{borderRadius: 30}}
      ref={bottomSheetMolalRef}
      index={!modelBottomSheet.isShowBottomSheet ? -1 : 0}
      backdropComponent={({style}: BottomSheetBackdropProps) => {
        const containerStyle = useMemo(
          () => [
            modelBottomSheet.isShowBottomSheet ? style : {},
            {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          ],
          [style, modelBottomSheet.isShowBottomSheet],
        );
        return (
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(closeModelBottomSheet());
            }}>
            <View style={containerStyle}></View>
          </TouchableWithoutFeedback>
        );
      }}
      snapPoints={snapPoints}>
      <ComponentView />
    </BottomSheet>
  );
};

export default BottomSheetCustom;

const styles = StyleSheet.create({});
