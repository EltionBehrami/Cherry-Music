import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../../store/playlists";
import { useEffect } from "react";
import "./nav.css"

const Navigation = () => {



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
            <div className="left-container">
                    <NavLink id="home" to="/">Cherry Music</NavLink>
                    <ul className="library-links">
                        <li><button id="album-link"><NavLink to="/albums" className="inactive-link" activeClassName="active-albums-link"> Albums</NavLink></button> </li>
                        <li><button id="song-link"><NavLink to="/songs" className="inactive-link" activeClassName="active-songs-link"> Songs</NavLink></button></li>
                    </ul>
                    {currentUser && <ul className="playlist-links"> 
                        <button id="playlists-link"><NavLink to="/playlists" className="inactive-link" activeClassName="active-playlists-link">Playlists</NavLink></button>
                        {playlistsArray.map(playlist => <button key={playlist.id}  className="playlist-link"> <NavLink to={`/playlists/${playlist.id}`} className="inactive-link"  activeClassName="active-playlists-link">{playlist.title}</NavLink></button>)}
                    </ul> }
                    <div className="about-me">
                            <a href="https://github.com/EltionBehrami" target="_blank">
                            <div id="git"></div>
                            </a>
                        <a href="https://www.linkedin.com/in/eltion-behrami-5b9367271/" target="_blank">
                            <div className="linked-in-container"></div>
                        </a>
                    </div>
            </div>
        </>
    )
}

export default Navigation;


