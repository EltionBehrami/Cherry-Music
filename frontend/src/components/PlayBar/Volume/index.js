const Volume = ({ handleVolume, volume}) => {

    return (
        <div className="volume-container">
            <input id="volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolume} ></input>
        </div>
    )
}

export default Volume;