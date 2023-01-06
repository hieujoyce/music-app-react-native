import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISong} from '../types';

const initialState: {target: ISong | null; type: string} = {
  target: null,
  type: '',
};

const listeningMusicSlice = createSlice({
  name: 'listeningMusic',
  initialState,
  reducers: {
    addTarget: (
      state,
      action: PayloadAction<{target: ISong; type: string}>,
    ) => {
      state.target = action.payload.target;
      state.type = action.payload.type;
    },
  },
});

const listeningMusicReducer = listeningMusicSlice.reducer;
export const {addTarget} = listeningMusicSlice.actions;

export default listeningMusicReducer;
