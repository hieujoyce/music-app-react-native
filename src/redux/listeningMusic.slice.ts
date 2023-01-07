import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISong} from '../types';

const initialState: {target: ISong | null; type: string; id: string} = {
  target: null,
  type: '',
  id: '',
};

const listeningMusicSlice = createSlice({
  name: 'listeningMusic',
  initialState,
  reducers: {
    addTarget: (
      state,
      action: PayloadAction<{target: ISong; type: string; id?: string}>,
    ) => {
      state.target = action.payload.target;
      state.type = action.payload.type;
      if (action.payload.id) {
        state.id = action.payload.id;
      }
    },
  },
});

const listeningMusicReducer = listeningMusicSlice.reducer;
export const {addTarget} = listeningMusicSlice.actions;

export default listeningMusicReducer;
