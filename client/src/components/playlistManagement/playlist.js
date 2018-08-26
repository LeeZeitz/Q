import React, { Component } from 'react';
import { subscribeToPlaylist } from '../../api';
import { resetCredentials } from '../../api';
import Navbar from '../navbar';
import Artist from './artist';
import Song from './song';

class Playlist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playlist: ''
        };

        subscribeToPlaylist((err, playlist) => {
            if (err) {
                resetCredentials((err, playlist) => {
                    let newPlaylist;
                    if (err) {
                        newPlaylist = 'An error has occured. Please try again later';
                    }
                    else{
                        newPlaylist = playlist;
                    }
                    this.setState({playlist: newPlaylist})
                });
            }
            else {
                this.setState({playlist})
            }
        });
    }

    expandPlaylist = (playlist) => {
        let tracks = [];
        try{
            playlist.forEach((track) => {
                tracks.push(
                    <div key={ track.id }>
                        <div>
                            { track.name }
                        </div>
                        <div>
                            { <Artist artist={ track.artists } /> }
                        </div>
                        <div>
                            { track.album }
                        </div>
                        < br/>
                    </div>
                );
            });
            return tracks;
        }
        catch(err) {
            return this.state.playlist;
        }
    }

    render() {
        console.log(this.state.playlist[0]);
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div>
                    { this.expandPlaylist(this.state.playlist) }
                </div>
                <br />
                <br />
                <div>
                    <Song song={ this.state.playlist[0] } />
                </div>
            </div>
        )
    }
}

export default Playlist;