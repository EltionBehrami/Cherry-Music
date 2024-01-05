import { useDispatch, useSelector } from "react-redux";
import { addSongToPlaylist, addToPlaylist, fetchPlaylists, getPlaylists } from "../../../../store/playlists";
import { useEffect } from "react";
import "./PlaylistMenu.css"


const PlaylistMenu = ({ track }) => { 

    const playlists = useSelector(state => state.playlists)
    const playlistsArray = Object.values(playlists)
    const dispatch = useDispatch(); 
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        if (currentUser){
            dispatch(fetchPlaylists())
        }
    }, [currentUser, dispatch])


    

    return (
        <>
            {currentUser && <ul className="playlist-menu"> 
                {playlistsArray.map(playlist => <li key={playlist.id} onClick={() => dispatch(addToPlaylist(playlist.id, track.id))} className="playlist-menu-item"> {playlist.title}</li>)}
            </ul> }
        </>
    )

}

export default PlaylistMenu