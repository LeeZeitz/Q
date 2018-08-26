import React, { Component } from 'react';
import './App.css';
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
