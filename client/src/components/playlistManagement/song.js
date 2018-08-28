import React from 'react';

const Song = (props) => {
    let song = props.song;
    let result;

    if (song !== undefined)
    {
        result = (
            <div className='song-row'>
                <div className='row'>
                    <div className='col-11 song-title'>
                        <span>
                            { song.name }
                        </span>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 song-info-row'>
                        <span className='song-info'>
                            { song.artists[0] }
                        </span>
                        <span className='song-info-seperator'>
                            -
                        </span>
                        <span className='song-info'>
                            { song.album }
                        </span>
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