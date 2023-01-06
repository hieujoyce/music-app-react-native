import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IArtist} from '../types';
import http from '../utils/http';

const initialState: Array<IArtist> = [];

export const getDeialArtist = createAsyncThunk(
  'detailArtist/getDeialArtist',
  async ({id, assessToken}: {id: string; assessToken: string}, thunkAPI) => {
    try {
      const response = await http.get(`artist/${id}`, {
        headers: {authorization: assessToken},
      });
      return response.data;
    } catch (error: any) {
      if (
        error.name === 'AxiosError' &&
        (error.response.status === 400 || error.response.status === 500)
      ) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const detailArtistSlice = createSlice({
  name: 'detailArtist',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDeialArtist.fulfilled, (state, action) => {
      state.push(action.payload.artist);
    });
  },
});

const detailArtistReducer = detailArtistSlice.reducer;
export const {} = detailArtistSlice.actions;

export default detailArtistReducer;
