import {AsyncThunk, createSlice} from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const initialState: {
  loading: boolean;
  msg: {type: 'error' | 'success'; data: string} | null;
} = {
  loading: false,
  msg: null,
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
        },
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        action =>
          action.type.endsWith('/rejected') ||
          action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading) {
            state.loading = false;
          }
          if (
            action.type.endsWith('/rejected') &&
            typeof action.payload === 'string'
          ) {
            state.msg = {type: 'error', data: action.payload as string};
          }
        },
      );
  },
});

const notifyReducer = notifySlice.reducer;

export default notifyReducer;
