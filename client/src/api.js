import openSocket from 'socket.io-client';
import axios from 'axios';

const socket = openSocket('http://192.168.1.130:8080');

const subscribeToPlaylist = (cb) => {
    socket.on('playlist', playlist => cb(!playlist, playlist));
    socket.emit('subscribeToPlaylist');
};

const subscribeToAddSong = (songId, cb) => {

    socket.on('addSong', message => cb(message));
    socket.emit('subscribeToAddSong', songId);

    /*
    axios.post('/api/add_song', {songId: songId})
        .then(response => {
            console.log(response.status);
            console.log(response.data);
            cb(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    */
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


export { subscribeToPlaylist, subscribeToAddSong, resetCredentials, searchSong };