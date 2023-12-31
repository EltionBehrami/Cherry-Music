import { createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import sessionReducer from "./session";
import modalReducer from "./modal";
import albumsReducer from "./albums";
import artistsReducer from "./artist";
import songsReducer from "./songs";
import playbarReducer from "./playbar";
import playlistReducer from "./playlists";
import playlistSongsReducer from "./playlistSongs";


const rootReducer = combineReducers({
    session: sessionReducer,
    modal: modalReducer,
    albums: albumsReducer,
    artists: artistsReducer,
    songs: songsReducer,
    playlists: playlistReducer,
    playlistSongs: playlistSongsReducer,
    playbar: playbarReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore; 