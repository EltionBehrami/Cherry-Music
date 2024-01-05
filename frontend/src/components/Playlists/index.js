import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchPlaylists, getPlaylists } from "../../store/playlists";
import PlaylistsIndexItem from "./PlaylistsIndexItem";
import "./PlaylistsIndex.css"

const PlaylistsIndex = () => {
    const dispatch = useDispatch();
    const playlists = useSelector(getPlaylists);
    const playlistsArray = Object.values(playlists)
    const currentUser = useSelector(state => state.session.user);

    

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchPlaylists());
        }
    }, [dispatch]);


    return (
        <>
                <div className="playlist-index-header">Playlists</div>
            {currentUser && (
                <div className="playlist-index-container">
                    {playlistsArray.map(playlist => <Link key={playlist.id} id="playlist-show-link" to={`/playlists/${playlist.id}`}> <PlaylistsIndexItem  playlist={playlist}/></Link>)}
                </div>
        )}
        </>
    )
}

export default PlaylistsIndex;