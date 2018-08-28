import React, { Component } from 'react';
import { subscribeToPlaylist } from '../../api';
import { resetCredentials } from '../../api';
import Navbar from './navbar';
import Header from '../header';
import Artist from './artist';
import Song from './song';

class Playlist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playlist: '',
            tab: 'playlist',
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
    };

    expandPlaylist = (playlist) => {
        let tracks = [];
        try{
            playlist.forEach((track) => {
                tracks.push(
                    <Song key={ track.id } song={ track } />
                );
            });
            return tracks;
        }
        catch(err) {
            return this.state.playlist;
        }
    };

    toggleTab = (tab) => {
        this.setState({tab});
    };

    render() {
        return (
            <div className='root'>
                <div>
                    <Header />
                </div>
                <div>
                    { this.expandPlaylist(this.state.playlist) }
                </div>
                <div>
                    <Navbar tab={ this.state.tab } onToggleTab={ this.toggleTab } />
                </div>
            </div>
        );
    };
}

export default Playlist;