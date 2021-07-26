import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay(){
        chooseTrack(track)
    }
    return (
        <div 
            className="d-flex m-2 align-items" 
            style={{ cursor:"pointer" }}
            onClick={handlePlay}
        >
            <img src={track.albumUrl} style={{ height: "64px", width: "64px"}} alt="album covers"/>
            <div className="p-2">
                <div className="text-light">{track.title}</div>
                <div className="text-muted">{track.artist}</div>
            </div>
            <div className="p-2 ms-auto text-end">
                <div className="text-light">{track.album}</div>
                <div className="text-muted">{track.date}</div>
            </div>
        </div>
    )
}
