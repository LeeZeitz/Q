import React, { Component } from 'react';
import { subscribeToPlaylist, subscribeToPlayback } from '../../api';
import { resetCredentials } from '../../api';
import Navbar from './navbar';
import Header from '../header';
import Playlist from './playlist';
import Search from './search';
import { expandPlaylist } from './playlist';

const errorMessage = 'An error has occured. Please try again later.';

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playlist: '',
            tab: 'search',
            searchTerm: '',
            searchResults: '',
            currentSong: '',
        };

        subscribeToPlaylist((err, playlist) => {
            if (err) {
                resetCredentials((err, playlist) => {
                    let newPlaylist;
                    if (err) {
                        newPlaylist = errorMessage;
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
        
        subscribeToPlayback((playback) => {
            this.setState({playback});
        });
    
    };

    changeSearchTerm = (searchTerm) => {
        this.setState({searchTerm});
    };    

    dispalyResults = (results) => {
        let parsedResults = expandPlaylist(results, true);
        this.setState({searchResults: parsedResults});
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
                <div className='content'>
                    { this.state.tab === 'playlist' && <Playlist playlist={ this.state.playlist } playback={ this.state.playback } /> }
                    { this.state.tab === 'search' && <Search 
                                                        searchTerm={ this.state.searchTerm } 
                                                        results={ this.state.searchResults } 
                                                        changeSearchTerm={ this.changeSearchTerm } 
                                                        dispalyResults={ this.dispalyResults } 
                                                    /> 
                    }
                </div>
                <div>
                    <Navbar tab={ this.state.tab } onToggleTab={ this.toggleTab } />
                </div>
            </div>
        );
    };
}

export default Content;