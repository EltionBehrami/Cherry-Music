import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAlbum, getAlbum, getAlbumSongs } from "../../../store/albums"
import TracksIndex from "../Tracks/TracksIndex";
import "./AlbumShow.css"

const AlbumShow = () => {

    const { albumId } = useParams(); 
    const album = useSelector(getAlbum(albumId))
    const songs = useSelector(getAlbumSongs(albumId))
    const dispatch = useDispatch();  

    useEffect(() => {
        dispatch(fetchAlbum(albumId))
    }, [dispatch, albumId])
    
    
    return (
        <>
            <div className="album-show-container">
                <div className="album-show-header">
                    <div id="album-cover-container"><img className="album-show-cover" src={album?.albumCover}/> </div>
                    <div id="album-show-right-header"> 
                        <div className="album-header">
                            <div className="album-header-title" > {album?.title} </div>
                            <div className="album-artist"> {album?.artistName}</div>
                            <div className="album-genre"> {album?.genre} </div>
                        </div>
                        <div id="album-play"> <button id="album-play-button" > Play </button> </div>
                    </div>
                </div>
                <div className="album-songs-container">
                    {album && (
                        <TracksIndex album={album} songs={songs}/>
                    )}
                </div>
            </div>
        </>

    )

}



export default AlbumShow; 