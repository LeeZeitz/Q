import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

const subscribeToPlaylist = (cb) => {
    socket.on('playlist', playlist => cb(null, playlist));
    socket.emit('subscribeToPlaylist', 'test_playlist');
};

export { subscribeToPlaylist };