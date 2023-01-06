import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../utils/http';

interface IMusicData {
  songs: {data: Array<any>; total: number};
  artists: {data: Array<any>; total: number};
  albums: {data: Array<any>; total: number};
}

export const fetchAllDataMusic = createAsyncThunk(
  'musicData/fetchAllDataMusic',
  async ({assessToken}: {assessToken: string}, thunkAPI) => {
    try {
      const promise1 = http.get('songs?limit=10', {
        headers: {authorization: assessToken},
      });
      const promise2 = http.get('artist', {
        headers: {authorization: assessToken},
      });
      const promise3 = http.get('album', {
        headers: {authorization: assessToken},
      });
      const [songsRes, artistsRes, albumsRes] = await Promise.all([
        promise1,
        promise2,
        promise3,
      ]);
      return {
        songs: songsRes.data,
        artists: artistsRes.data,
        albums: albumsRes.data,
      };
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

const initialState: IMusicData = {
  albums: {data: [], total: 0},
  artists: {data: [], total: 0},
  songs: {data: [], total: 0},
};

const musicDataSlice = createSlice({
  name: 'musicData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllDataMusic.fulfilled, (state, action) => {
      state.albums.data = action.payload.albums.data;
      state.songs.data = action.payload.songs.data;
      state.artists.data = action.payload.artists.data;
      state.albums.total = action.payload.albums.total;
      state.songs.total = action.payload.songs.total;
      state.artists.total = action.payload.artists.total;
    });
  },
});

const musicDataReducer = musicDataSlice.reducer;

export default musicDataReducer;
