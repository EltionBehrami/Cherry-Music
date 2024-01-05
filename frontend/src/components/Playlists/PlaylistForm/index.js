import { useDispatch, useSelector } from "react-redux";
import { createPlaylist, fetchPlaylist, getPlaylist, updatePlaylist } from "../../../store/playlists";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import "./PlaylistForm.css"
import { useEffect } from "react";


const PlaylistForm = ( {playlistId} ) => {
    const dispatch = useDispatch(); 
    const playlist = useSelector(getPlaylist(playlistId))
    const [title, setTitle] = useState( playlistId ? playlist.title : ""); 
    const [description, setDescription] = useState( playlistId ? playlist.description : "");
    const currentUserId = useSelector(state => state.session.user.id)

    
    useEffect(() => {
        if (playlistId) {
            dispatch(fetchPlaylist(playlistId));
        }
    }, [dispatch, playlistId]);
    
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        let playlist = {userId: currentUserId, title, description, id: playlistId}
        dispatch( playlistId ? updatePlaylist(playlist) : createPlaylist(playlist) )
    }


    return (
    <div className="playlist-form-container">
        <div className="new-playlist-header">{ playlistId ? "Edit Playlist" : "New Playlist"}</div>
        <form className="playlist-form" onSubmit={handleSubmit}>
            <div id="top-form-div">
                <div id='playlist-title-input-container'>
                    <input id="playlist-title-input" type="text" value={title} placeholder="Playlist title"onChange={changeTitle}/>
                </div>
                <div>
                    <textarea id= "playlist-description-input" value={description} placeholder="Description (optional)"onChange={changeDescription}/>
                </div>
            </div>
            <div id="create-button-container">
                <input id="create-button" type="submit" value={ playlistId ? "Edit" : "Create"} />
            </div>
        </form>
    </div>

    )

}

export default PlaylistForm