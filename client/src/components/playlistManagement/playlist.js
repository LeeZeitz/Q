import React, { Component } from 'react';
import { subscribeToPlaylist } from '../../api';

class Playlist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playlist: 'no playlist yet'
        };

        subscribeToPlaylist((err, playlist) => {
            this.setState({playlist})
        });
    }

    render() {
        return (
            <div>
                <div>
                    Hello World!
                </div>
                <div>
                    { this.state.playlist }
                </div>
            </div>
        )
    }
}

export default Playlist;