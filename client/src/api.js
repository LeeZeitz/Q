import openSocket from 'socket.io-client';
import axios from 'axios';

const socket = openSocket('http://192.168.1.71:8080');

const subscribeToPlaylist = (cb) => {
    socket.on('playlist', playlist => cb(!playlist, playlist));
    socket.emit('subscribeToPlaylist');
};

const subscribeToAddSong = (songId, cb) => {

    //socket.on('addSong', message => cb(message));
    //socket.emit('subscribeToAddSong', songId);
    
    axios.post('/api/add_song', {songId: songId})
        .then(response => {
            cb(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    
};

const subscribeToPlayback = (cb) => {
    socket.on('playback', playback => cb(playback));
    socket.emit('subscribeToPlayback');
};

const resetCredentials = (cb) => {
    axios.get('/api/resetCredentials')
        .then(response => {
            subscribeToPlaylist(cb);
        })
        .catch (err => {
            console.log(err);
        });
}

const searchSong = (searchTerm, cb) => {
    axios.post('/api/search_song', {searchTerm: searchTerm})
        .then(response => {
            cb(response.data);
        })
        .catch (err => {
            console.log(err);
        });
};


export { subscribeToPlaylist, subscribeToPlayback, subscribeToAddSong, resetCredentials, searchSong };