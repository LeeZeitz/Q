import React from 'react';

const Artist = (props) => {
    let artists = [];
    props.artist.forEach(artist => {
        artists.push(
            <div key={ artist }>
                { artist }
            </div>    
        )
    });
    return artists;
}

export default Artist;