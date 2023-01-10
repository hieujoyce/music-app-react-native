import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from '@reduxjs/toolkit';
import {ILoginForm, IRegisterForm, IUser} from '../types';
import http from '../utils/http';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const initialState: {data: IUser | null; accessToken: string} = {
  data: null,
  accessToken: '',
};
//user

export const createPlayList = createAsyncThunk(
  'user/createPlayList',
  async (
    {accessToken, name}: {accessToken: string; name: string},
    thunkAPI,
  ) => {
    try {
      const response = await http.post(
        `users/playList`,
        {name},
        {
          headers: {authorization: accessToken},
        },
      );
      return response.data;
    } catch (error: any) {
      console.log({...error});
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

export const addFavorites = createAsyncThunk(
  'user/addFavorites',
  async (
    {accessToken, idSong}: {accessToken: string; idSong: string},
    thunkAPI,
  ) => {
    try {
      const response = await http.post(`users/favorite/${idSong}`, null, {
        headers: {authorization: accessToken},
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

export const deleteFavorites = createAsyncThunk(
  'user/deleteFavorites',
  async (
    {accessToken, idSong}: {accessToken: string; idSong: string},
    thunkAPI,
  ) => {
    try {
      const response = await http.delete(`users/favorite/${idSong}`, {
        headers: {authorization: accessToken},
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

export const login = createAsyncThunk(
  'user/login',
  async (body: ILoginForm, thunkAPI) => {
    try {
      const response = await http.post('auth/login', body);
      return response.data;
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (body: IRegisterForm, thunkAPI) => {
    try {
      const response = await http.post('auth/register', body);
      return response.data;
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.error);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state, payload: PayloadAction) => {
      state.data = null;
      state.accessToken = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createPlayList.fulfilled, (state, action) => {
        if (state.data) {
          state.data.playlists = [...action.payload.user.playlists];
        }
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        if (state.data) {
          state.data.favorites = [...action.payload.user.favorites];
        }
      })
      .addCase(deleteFavorites.fulfilled, (state, action) => {
        if (state.data) {
          state.data.favorites = [...action.payload.user.favorites];
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addMatcher<RejectedAction>(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          if (action.payload === 'Xác thực thất bại') {
            state.data = null;
            state.accessToken = '';
          }
        },
      );
  },
});

const userReducer = userSlice.reducer;
export const {logOut} = userSlice.actions;
export default userReducer;
