import React from 'react';
import Song from './song';

const expandPlaylist = (playlist, add, spinner=false, onSongAdd) => {
    let tracks = [];
    try{
        playlist.forEach((track, i) => {
            tracks.push(
                <Song key={ track.id } add={ add } song={ track } spinner={ spinner } onSongAdd={ onSongAdd } playing={ i === 0 && !add } />
            );
        });
        return tracks;
    }
    catch(err) {
        console.log(err);
        return playlist;
    }
};

const trimToQueue = (playlist, playback) => {

    if (playback) {
        let currentTrackIndex = playlist.findIndex((track) => {
            if (track.id === playback.id) {
                return track;
            };
        });

        console.log(playback);
        console.log(playlist);
        console.log(currentTrackIndex);

        return playlist.slice(currentTrackIndex);
    }
    else {
        return playlist;
    }

};

const Playlist = (props) => {

    let playlist = trimToQueue(props.playlist, props.playback);

    return (
        <div>
            { expandPlaylist(playlist) }
        </div>
    );
};

export default Playlist;
export { expandPlaylist };