import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, getAlbums } from "../../../store/albums";
import { useEffect } from "react";
import AlbumIndexItem from "../AlbumsIndexItem";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./AlbumsIndex.css"

const AlbumsIndex = () => {
    const dispatch = useDispatch();
    const albums = useSelector(getAlbums);
    const albumsArray = Object.values(albums)
    const currentUser = useSelector(state => state.session.user);
    

    useEffect(() => {
            dispatch(fetchAlbums());
    }, [dispatch]);


    return (
        <>  
                <div className="index-header">Albums</div>
                <div className="index-container">
                    {albumsArray.map(album => <Link key={album.id} id="album-show-link" to={`/albums/${album.id}`}> <AlbumIndexItem  album={album}/></Link>)}
                </div>
        </>
    )
}

export default AlbumsIndex;