import csrfFetch from "./csrf";
import { RECEIVE_PLAYLIST_SONG } from "./playlistSongs";

export const RECEIVE_PLAYLISTS = "playlists/RECEIVE_PLAYLISTS"
export const RECEIVE_PLAYLIST = "playlists/RECEIVE_PLAYLIST"
export const REMOVE_PLAYLIST = "playlists/REMOVE_PLAYLIST"
export const ADD_SONG_TO_PLAYLIST = "playlists/ADD_SONG_TO_PLAYLIST"
export const REMOVE_SONG_FROM_PLAYLIST = "playlists/REMOVE_SONG_FROM_PLAYLIST"

export const receivePlaylists = (playlists) => {
    return {
        type: RECEIVE_PLAYLISTS,
        playlists 
    }
}

export const receivePlaylist = (playlist) => {
    return {
        type: RECEIVE_PLAYLIST,
        playlist 
    }
}

export const removePlaylist = (playlistId) => {
    return {
        type: REMOVE_PLAYLIST,
        playlistId 
    }
}

export const addSongToPlaylist = (playlistId, songId) => {
    return {
        type: ADD_SONG_TO_PLAYLIST,
        payload: {
            playlistId,
            songId
        },
    }
}

export const removeSongFromPlaylist = (playlistSongId, songId, playlistId) => {
    return {
        type: REMOVE_SONG_FROM_PLAYLIST,
        payload: {
            playlistSongId,
            songId,
            playlistId
        },
    }
}

export const getPlaylists = state => {
    return state?.playlists ? state.playlists : []; 
}

export const getPlaylist = playlistId => state => {
    return state?.playlists ? state.playlists[playlistId] : null;
} 

export const getPlaylistSongs = (playlistId) => (state) => {
    const playlistSongs = state.playlists[(playlistId)]?.playlistSongs || [];
    const songs = Object.values(state.songs)
        .filter(song => playlistSongs.includes(song.id)); 
    return songs;
};


export const fetchPlaylists = () => async dispatch => {
    const response = await csrfFetch(`/api/playlists`);
    if (response.ok) {
        const data = await response.json(); 
        dispatch(receivePlaylists(data))
    }
}

export const fetchPlaylist = (playlistId) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`);
    if (response.ok) {
        const data = await response.json(); 
        dispatch(receivePlaylist(data))
    }
}

export const createPlaylist = (playlist) => async dispatch => {
    const response = await csrfFetch(`/api/playlists`, {
        method: "POST", 
        body: JSON.stringify(playlist),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    if (response.ok) {
        const data = await response.json(); 
        dispatch(receivePlaylist(data.playlist))
    }
}


export const addToPlaylist = (playlistId, songId) => async dispatch => {
    const response = await csrfFetch(`/api/playlist_songs`, {
        method: "POST", 
        body: JSON.stringify ({ playlistSong: { songId, playlistId } }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if (response.ok){
        const data = await response.json(); 
        dispatch(addSongToPlaylist(data))
        return data 
    }
}

export const deletePlaylistSong = (playlistSongId, playlistId, songId) => async dispatch => {
    const response = await csrfFetch(`/api/playlist_songs/${playlistSongId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeSongFromPlaylist(playlistSongId, playlistId, songId))
    }
}

export const updatePlaylist = (playlist) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${playlist.id}`, {
        method: "PATCH", 
        body: JSON.stringify(playlist),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        const data = await response.json(); 
        dispatch(receivePlaylist(data))
    }
}

export const deletePlaylist = (playlistId) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: "DELETE"
    }); 

    if (response.ok) {
        dispatch(removePlaylist(playlistId))
    }
}


const playlistReducer = (state = {}, action) => {
    const newState = {...state}; 
    switch (action.type) {
        case RECEIVE_PLAYLISTS: 
            return {...action.playlists};
        case RECEIVE_PLAYLIST: 
            return {...newState, [action.playlist.id]: action.playlist} 
        case REMOVE_PLAYLIST: 
            delete newState[action.playlistId];
            return newState;
        case ADD_SONG_TO_PLAYLIST: 
        const { playlistId, songId } = action.payload;
        const playlistToUpdate = newState[playlistId];
        if (playlistToUpdate) {
            const updatedPlaylist = {
                ...playlistToUpdate,
                playlistSongs: [...playlistToUpdate.playlistSongs, songId],
                // playlistSongIds: [...playlistToUpdate.playlistSongIds, action.payload.id]
            };
            return {
                ...newState,
                [playlistId]: updatedPlaylist,
            };
        }
        return newState;
        case REMOVE_SONG_FROM_PLAYLIST: 
            const playlist = {...newState[action.payload.playlistId]}
    
            playlist.playlistSongs = playlist.playlistSongs.filter((id) => id !== action.payload.songId)
            playlist.playlistSongIds = playlist.playlistSongIds.filter((id) => id !== action.payload.playlistSongId)

            const updatedState =  {
                ...newState, [action.payload.playlistId]: playlist,
            };

            return updatedState
        case REMOVE_PLAYLIST: 
            delete newState[action.playlistId];
            return newState;
        default: 
            return state;
    }
}

export default playlistReducer

