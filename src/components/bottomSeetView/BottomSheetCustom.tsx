import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import React, {useRef, useMemo, useState, useEffect} from 'react';
import BottomSheet, {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch} from '../../redux/store';
import {closeModelBottomSheet} from '../../redux/modelBottomSheet';
import BottomSheetSongView from './BottomSheetSongView';
import {ISong} from '../../types';

const BottomSheetCustom = () => {
  const bottomSheetMolalRef = useRef<BottomSheet>(null);
  const {modelBottomSheet} = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const ComponentView = () => {
    switch (modelBottomSheet.type) {
      case 'song':
        return <BottomSheetSongView el={modelBottomSheet.el as ISong} />;
      default:
        return null;
    }
  };
  const snapPoints = useMemo(() => {
    let p = '50%';
    if (modelBottomSheet.type === 'song') {
      p = '75%';
    }
    return [p];
  }, [modelBottomSheet.type]);

  return (
    <BottomSheet
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
              bottomSheetMolalRef.current?.close();
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
