import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./TrackMenuButton.css"
import { openModal } from "../../../../store/modal";
import { addSongToPlaylist, deletePlaylistSong } from "../../../../store/playlists";
import PlaylistsIndex from "../../../Playlists";
import PlaylistMenu from "../PlaylistMenu/PlaylistMenu";

const TrackMenuButton = ({ track, playlist }) => {

    const dispatch = useDispatch(); 
    const [showTrackMenu, setShowTrackMenu] = useState(false)
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false)
    

    const getPlaylistSongId = (track) => {
        const playlistSongs = playlist.playlistSongs 
        const playlistSongIds = playlist.playlistSongIds
        const trackIndex = playlistSongs.indexOf(track.id)
        const playlistSongId = playlistSongIds[trackIndex]
        return playlistSongId
    }

    const openTrackMenu = () => {
        if (showTrackMenu) {
            setShowTrackMenu(false)
        } else {
            setShowTrackMenu(true)
        }
    }

    const openPlaylistMenu = () => {
        if (showPlaylistMenu) {
            setShowPlaylistMenu(false)
        };  
            setShowPlaylistMenu(true)
    }

    const removeFromPlaylist = (track) => {
        const playlistSongId = getPlaylistSongId(track)
        dispatch(deletePlaylistSong(playlistSongId, track.id, playlist.id))
    }

    const closeMenus = () => {
        if (showTrackMenu) {
            setShowTrackMenu(false);
        }

        if (showPlaylistMenu) {
            setShowPlaylistMenu(false);
        }
    };

    useEffect(() => {
        
        if (showTrackMenu || showPlaylistMenu) {
            document.addEventListener("click", closeMenus);
        }
        
        return () => {
            document.removeEventListener("click", closeMenus);
        };
    }, [showTrackMenu, showPlaylistMenu]);


    return (
        <div className="track-menu-button-container"onClick={(e) => e.stopPropagation()}>
            <svg id="track-button" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" onClick={openTrackMenu}>
                <path d="M10.105 14c0-.87-.687-1.55-1.564-1.55-.862 0-1.557.695-1.557 1.55 0 .848.695 1.55 1.557 1.55.855 0 1.564-.702 1.564-1.55zm5.437 0c0-.87-.68-1.55-1.542-1.55A1.55 1.55 0 0012.45 14c0 .848.695 1.55 1.55 1.55.848 0 1.542-.702 1.542-1.55zm5.474 0c0-.87-.687-1.55-1.557-1.55-.87 0-1.564.695-1.564 1.55 0 .848.694 1.55 1.564 1.55.848 0 1.557-.702 1.557-1.55z"></path>
            </svg>
            {showTrackMenu && (
                <ul className="track-dropdown">
                    <li><button id="create-playlist-button" onClick={() => dispatch(openModal("create_playlist"))}>New Playlist</button></li>
                    <li><button id="add-to-playlist-button" onClick={openPlaylistMenu}>Add to playlist</button></li>
                    {playlist && (
                        <li><button onClick={(e) => removeFromPlaylist(track)}>Remove from playlist</button></li>
                    )}
                </ul>
            )}
            {showPlaylistMenu && <div onClick={closeMenus} className="playlist-menu-container">
                <PlaylistMenu track={track} />
                </div>}
        </div>
    )
}

export default TrackMenuButton;