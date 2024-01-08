# Cherry Music

Cherry Music is a clone of Apple Music, providing a seamless music streaming experience. Key features include albums, playlists, a dynamic playbar, and a search functionality.

[Cherry Music](https://cherry-music.onrender.com/)

## Technologies Used

- **Frontend:** React, Redux, CSS
- **Backend:** Ruby on Rails
- **Database:** PostgreSQL
- **Cloud Services:** AWS

## Key Features

### Music Player Controls

The following JavaScript code provides functions for controlling a music player in a React application:

- `next`: Advances to the next song in the queue if available.
- `previous`: Goes to the previous song in the queue if available.
- `play`: Initiates playback of the current song or restarts from the beginning.
- `pause`: Pauses the currently playing song.

These functions are commonly used in a music player application to manage the playback flow and user interaction.


```javascript
const next = () => {
    if (currentSongIndex < queue.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
    }
}

const previous = () => {
    if (currentSongIndex > 0) {
        setCurrentSongIndex(currentSongIndex - 1);
    }
}

const play = () => {
    if (currentSong) {
        audioRef.current.currentTime = audioRef.current.currentTime || 0;
        dispatch(playSong());
    }
};

const pause = () => {
    dispatch(pauseSong());
}
```

### Creating Playlists

Users can personalize their music experience by creating and managing playlists. The implementation includes CRUD operations for playlists, ensuring a tailored and consistent playlist experience across devices.

```javacript
case ADD_SONG_TO_PLAYLIST: 
        const { playlistId, songId } = action.payload;
        const playlistToUpdate = newState[playlistId];
        if (playlistToUpdate) {
            const updatedPlaylist = {
                ...playlistToUpdate,
                playlistSongs: [...playlistToUpdate.playlistSongs, songId],
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
```


## Conclusion

Cherry Music delivers a feature-rich music streaming experience, combining the elegance of Apple Music with the flexibility of a custom-built solution. The use of React, Redux, Ruby on Rails, PostgreSQL, and AWS showcases a harmonious synergy between frontend, backend, database, and cloud technologies, providing users with a seamless and enjoyable music platform.

