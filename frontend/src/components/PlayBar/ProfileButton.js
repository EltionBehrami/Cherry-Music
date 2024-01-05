import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import "./profilebutton.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const ProfileButton = () => {

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)
    const history = useHistory();

    const openMenu = (e) => {
        e.stopPropagation(); 
        if (!showMenu) {
            setShowMenu(true);
        }
    }

    
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = e => {
                setShowMenu(false)
        }
            document.addEventListener("click", closeMenu)
    
            return () => document.removeEventListener("click", closeMenu)

            
    }, [showMenu])

    const logout = (e) => {
        e.preventDefault(); 
        dispatch(sessionActions.logout());
        history.push("/")
    };


    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" onClick={openMenu} id="profile-button">
                <path d="M14.007 28C6.299 28 0 21.703 0 14S6.299 0 14.007 0C21.7 0 28 6.297 28 14s-6.299 14-13.993 14zm0-9.392c4.253 0 7.49 1.514 8.805 3.216 1.815-2.08 2.899-4.81 2.899-7.824 0-6.54-5.12-11.784-11.704-11.784C7.41 2.216 2.289 7.46 2.289 14c0 3.014 1.084 5.743 2.9 7.824 1.313-1.702 4.55-3.216 8.818-3.216zm-.014-2.297c-2.6-.027-4.646-2.19-4.646-5.095-.014-2.73 2.059-4.986 4.646-4.986 2.601 0 4.647 2.256 4.647 4.986 0 2.906-2.032 5.122-4.647 5.095z"></path>
            </svg>
            {showMenu && (
                <ul className="dropdown">
                    <button id="logout-button"onClick={logout}>Sign Out</button>
                </ul>
            )}
        </>
    )
} 

export default ProfileButton; 