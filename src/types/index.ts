export enum KeyStorage {
  ACCESS_TOKEN = 'musicapp:accessToken',
}

export interface IArtist {
  _id: string;
  id: number;
  name: string;
  image: string;
  songsAmount: number;
  ablumsAmount: number;
  time?: number;
  songs?: Array<any>;
}

export interface ISong {
  _id: number;
  id: number;
  title: string;
  titleShort: string;
  time: number;
  src: string;
  image: string;
  rank: number;
  artistId: number;
  albumId: number;
  artist?: any;
}

export interface IPlayList {
  name: string;
  songList: Array<any>;
  count: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  favorites: Array<any>;
  playlists: Array<any>;
}

export interface IAlbum {
  _id: string;
  id: number;
  title: string;
  label: string;
  image: string;
  artistId: number;
  releaseDate: string;
  songsAmount: number;
  songs: Array<any>;
  songsAlbum?: Array<any>;
  time?: number;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  email: string;
  name: string;
  password: string;
  cfPassword: string;
}
