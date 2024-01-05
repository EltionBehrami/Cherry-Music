import TracksIndexItem from "./TracksIndexItem"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentSong, setPlaylistQueue } from "../../../store/playbar";
import { setQueue } from "../../../store/playbar";
import "./TracksIndex.css"

const TracksIndex = ( {album, songs, playlist} ) => {

    const [activeItemId, setActiveItemId] = useState(null)
    const dispatch = useDispatch();

    const handleItemClick = (song) => {
        setActiveItemId(song.id === activeItemId ? null : song.id);
        dispatch(setCurrentSong(song.id))
        if (album) {
            dispatch(setQueue(album))
        }
        if (playlist) {
            dispatch(setPlaylistQueue(playlist))
        }
    };

    return (
        <ul className="tracks-index-container ">
            {Object.values(songs).map((song, index) => 
            <li key={song.id} onClick={() => handleItemClick(song)} className={index % 2 === 0 ? 'even' : 'odd'}>
                <TracksIndexItem 
                    track={song}   
                    isActive={song.id === activeItemId}
                    handleItemClick={handleItemClick}
                    album={album}
                    playlist={playlist}
                />
            </li>)}
        </ul> 
    )
}

export default TracksIndex 


