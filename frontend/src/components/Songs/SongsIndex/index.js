import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs, getSongs } from "../../../store/songs";
import { setCurrentSong, setSongQueue } from "../../../store/playbar";
import TracksIndexItem from "../../Albums/Tracks/TracksIndexItem";


import "./SongsIndex.css"

const SongsIndex = () => {
    const [activeItemId, setActiveItemId] = useState(null)
    const dispatch = useDispatch();
    const songs = useSelector(getSongs)
    const currentUser = (state => state.session.user)

    const handleItemClick = (song) => {
        setActiveItemId(song.id === activeItemId ? null : song.id);
        dispatch(setCurrentSong(song.id))
        dispatch(setSongQueue(song.id))
    };

    useEffect(() => {
        if (currentUser){
            dispatch(fetchSongs());
        }
    }, [dispatch])

    

    return (
        <>
            <div className="songs-index-header">Songs</div>
            <ul className="songs-index-container ">
                {Object.values(songs).map((song, index) => 
                <li key={song.id} onClick={() => handleItemClick(song)} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <TracksIndexItem 
                        track={song}   
                        isActive={song.id === activeItemId}   
                        />
                </li>)}
            </ul> 
        </>
    )
}

export default SongsIndex;