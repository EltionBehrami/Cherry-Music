import csrfFetch from "./csrf";
import { ADD_SONG_TO_PLAYLIST } from "./playlists";

export const RECEIVE_PLAYLIST_SONG = "RECEIVE_PLAYLIST_SONG"

export const receivePlaylistSong = (song) => {
    return {
        type: RECEIVE_PLAYLIST_SONG,
        song
    }
}

export const RECEIVE_PLAYLIST_SONGS = "RECEIVE_PLAYLIST_SONGS"

export const receivePlaylistSongs = (songs) => {
    return {
        type: RECEIVE_PLAYLIST_SONGS,
        songs
    }
}


const playlistSongsReducer = (state = {}, action) => {
        const newState = {...state}
        switch (action.type){
            case ADD_SONG_TO_PLAYLIST: 
                return {...action.payload.id}
            default: 
                return state;     
        }
}   

export default playlistSongsReducer;