import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAlbum} from '../types';
import http from '../utils/http';

const initialState: Array<IAlbum> = [];

export const getDeialAlbum = createAsyncThunk(
  'detailAlbum/getDeialAlbum',
  async (
    {
      id,
      assessToken,
      artistArr,
    }: {id: string; assessToken: string; artistArr: Array<any>},
    thunkAPI,
  ) => {
    try {
      const response = await http.get(`album/${id}`, {
        headers: {authorization: assessToken},
      });
      const findIndex = artistArr.findIndex(
        el => el.id === response.data.album.artistId,
      );

      let songsAlbum = response.data.album.songsAlbum.map((el: any) => {
        return {...el, artist: artistArr[findIndex]};
      });
      let time = songsAlbum.reduce((a: any, b: any) => a + b.time, 0);

      let albumData = {...response.data.album, songsAlbum, time};
      return albumData;
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

const detailAlbumSlice = createSlice({
  name: 'detailAlbum',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDeialAlbum.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

const detailAlbumReducer = detailAlbumSlice.reducer;
export const {} = detailAlbumSlice.actions;

export default detailAlbumReducer;
