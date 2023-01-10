import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISong} from '../types';

const initialState: {
  isShowBottomSheet: boolean;
  type: string;
  el: ISong | null;
} = {
  isShowBottomSheet: false,
  type: '',
  el: null,
};

interface IPayLoadActionSong {
  type: 'song';
  el: ISong;
}

interface IPayLoadActionArtist {
  type: 'artist';
  el: any;
}

interface IPayLoadActionPlaylistAdd {
  type: 'playlistAdd';
  el: null;
}

const modelBottomSheetSlice = createSlice({
  name: 'modelBottomSheet',
  initialState,
  reducers: {
    openModelBottomSheet: (
      state,
      action: PayloadAction<
        IPayLoadActionSong | IPayLoadActionArtist | IPayLoadActionPlaylistAdd
      >,
    ) => {
      state.isShowBottomSheet = true;
      state.type = action.payload.type;
      state.el = action.payload.el;
    },
    closeModelBottomSheet: (state, action: PayloadAction) => {
      state.isShowBottomSheet = false;
    },
  },
});

const modelBottomSheetReducer = modelBottomSheetSlice.reducer;

export const {closeModelBottomSheet, openModelBottomSheet} =
  modelBottomSheetSlice.actions;

export default modelBottomSheetReducer;
