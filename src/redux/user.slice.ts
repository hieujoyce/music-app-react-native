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

export const addFavorites = createAsyncThunk(
  'user/addFavorites',
  async ({}, thunkAPI) => {
    try {
      const response = await http.post('auth/login');
      return response.data;
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 400) {
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
