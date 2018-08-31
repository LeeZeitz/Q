import React from 'react';
import Song from './song';

const expandPlaylist = (playlist, add) => {
    let tracks = [];
    try{
        playlist.forEach((track) => {
            tracks.push(
                <Song key={ track.id } add={ add } song={ track } />
            );
        });
        return tracks;
    }
    catch(err) {
        return playlist;
    }
};

const Playlist = (props) => {

    return (
        <div>
            { expandPlaylist(props.playlist) }
        </div>
    );
};

export default Playlist;
export { expandPlaylist };