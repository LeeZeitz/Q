import React from 'react';

/*
listSongs = (songs) => {

    songs.forEach
    return (

    )
}
*/

const Song = (props) => {
    let song = props.song;
    let result;

    if (song !== undefined)
    {
        result = (
            <div>
                <div className='row'>
                    <div className='col-11 song-title'>
                        <span>
                            { song.name }
                        </span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        { song.artists[0] }
                    </div>
                </div>
            </div>
        )
    }
    else {
        result = null;
    }
    return result;

};

export default Song;