import openSocket from 'socket.io-client';
import axios from 'axios';

const socket = openSocket('http://localhost:8080');

const subscribeToPlaylist = (cb) => {
    socket.on('playlist', playlist => cb(!playlist, playlist));
    socket.emit('subscribeToPlaylist');
};

const resetCredentials = (cb) => {
    axios.get('/api/resetCredentials')
        .then(response => {
            subscribeToPlaylist(cb);
        })
        .catch (err => {
            console.log(err);
        })
}

export { subscribeToPlaylist, resetCredentials };