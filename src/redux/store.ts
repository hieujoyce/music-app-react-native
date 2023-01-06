import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import detailAlbumReducer from './detailAlbum.slice';
import detailArtistReducer from './detailArtist.slice';
import listeningMusicReducer from './listeningMusic.slice';
import musicDataReducer from './musicData';
import notifyReducer from './notify.slice';
import userReducer from './user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notify: notifyReducer,
    musicData: musicDataReducer,
    listeningMusic: listeningMusicReducer,
    detailArtist: detailArtistReducer,
    detailAlbum: detailAlbumReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
