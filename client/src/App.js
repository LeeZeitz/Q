import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { subscribeToPlaylist } from './api';
import Playlist from './components/playlistManagement/playlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Playlist />
      </div>
    );
  }
}

export default App;
