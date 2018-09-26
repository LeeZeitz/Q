var express = require('express');
var app = express();
const io = require('socket.io')();
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

let fetchPlaybackResults = () => {};

let SpotifyWebApi = require('spotify-web-api-node');


let scopes = ['playlist-modify-private', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public', 'user-library-read', 'user-read-currently-playing', 'user-modify-playback-state', 'user-read-playback-state', ],
  redirectUri = 'http://localhost:3001/callback',
  state = 'some-state-of-my-choice';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
let spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: redirectUri
});

refreshToken = () => {
    spotifyApi.refreshAccessToken()
    .then(function(data) {
        console.log('The access token has been refreshed!');
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        return true;
    }, function(err) {
        console.log('Could not refresh access token', err);
        return false;
    });
};

const parsePlaylist = (data) => {
    let rawTracks = data.body.tracks.items;
    let tracks = [];
    rawTracks.forEach((track) => {
        let rawArtists = track.track.artists;
        let artists = [];
        rawArtists.forEach((artist) => {
            artists.push(artist.name);
        });
        tracks.push(
            {
                artists: artists,
                album: track.track.album.name,
                name: track.track.name,
                id: track.track.id,
            }
        );
    });

    return tracks;
}

const fetchPlayback = () => {
    spotifyApi.getMyCurrentPlaybackState({})
        .then((data) => {
            let duration = data.body.item.duration_ms;
            let elapsed = data.body.progress_ms;
            let timeRemaining = duration - elapsed + 1000;

            io.sockets.emit('playback', data.body.item);
            fetchPlaybackResults = setTimeout(fetchPlayback, timeRemaining);        
        })
        .catch((err) => {
            io.sockets.emit('playback', null);
            fetchPlaybackResults = setTimeout(fetchPlayback, 10000);
        });
}

// SOCKET
//
io.on('connection', (socket) => {
    // emit
    socket.on('subscribeToPlaylist', () => {
        console.log('client is subscribing to playlist');
        spotifyApi.getPlaylist(USER, PLAYLIST2)
        .then((data) => {
            let results = parsePlaylist(data);
            socket.emit('playlist', results)}, (err) => {
                result = refreshToken();
                if (result) {
                    spotifyApi.getPlaylist(USER, PLAYLIST2)
                    .then( (data) => {
                        let results = parsePlaylist(data);
                        socket.emit('playlist', results);
                    },
                    (err) => {
                        console.log(err);
                        socket.emit('playlist', 'An error has occured. Please try again later.');
                    });
                }
                socket.emit('playlist', false);
            });
    });

    socket.on('subscribeToAddSong', (songId) => {
        console.log('client is subscribing to add song');
        spotifyApi.addTracksToPlaylist(USER, PLAYLIST2, ['spotify:track:' + songId])
            .then(function(data) {
                console.log('Added tracks to playlist!');
                spotifyApi.getPlaylist(USER, PLAYLIST2)
                    .then((data) => {
                        let results = parsePlaylist(data);
                        io.sockets.emit('playlist', results);
                    },
                    (err) => {
                        console.log(err);
                    })
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    });

    socket.on('subscribeToPlayback', () => {
        console.log('client is subscribing to playback');

        clearTimeout(fetchPlaybackResults);

        spotifyApi.getMyCurrentPlaybackState({})
            .then((data) => {
                let duration = data.body.item.duration_ms;
                let elapsed = data.body.progress_ms;
                let timeRemaining = duration - elapsed + 1000;

                io.sockets.emit('playback', data.body.item);
                fetchPlaybackResults = setTimeout(fetchPlayback, timeRemaining);        
            })
            .catch((err) => {
                io.sockets.emit('playback', null);
                fetchPlaybackResults = setTimeout(fetchPlayback, 10000);
            });
    });
});

// ENDPOINTS
//
app.get('/', (req, res) => {
    // Create the authorization URL
    console.log('/ hit');
    let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    console.log(authorizeURL);
    res.redirect(authorizeURL);
});

app.get('/api/resetCredentials', (req, res) => {
    console.log('/api/resetCredentials hit');
    let authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
    console.log(authorizeURL);
    res.redirect(authorizeURL);
})

app.get('/callback', (req, res) => {
    console.log('/callback hit');
    let code = req.query.code;

    // Get and set access token for Spotify API
    spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
            res.redirect('/playlist');
        },
        function(err) {
            res.status(err.code);
            res.send(err.message);
        }
    );
})

app.get('/playlist', (req, res) => {

    console.log('/playlist hit');
    spotifyApi.getPlaylist(USER, PLAYLIST2)
        .then(function(data) {
            let rawTracks = data.body.tracks.items;
            let tracks = [];
            rawTracks.forEach((track) => {
                let rawArtists = track.track.artists;
                let artists = [];
                rawArtists.forEach((artist) => {
                    artists.push(artist.name);
                });
                tracks.push(
                    {
                        artists: artists,
                        album: track.track.album.name,
                        name: track.track.name,
                    }
                );
            });
            res.send(tracks);
        }, function(err) {
            result = refreshToken();
            if (result) {
                spotifyApi.getPlaylist(USER, PLAYLIST2)
                .then((data) => {
                    let rawTracks = data.body.tracks.items;
                    let tracks = [];
                    rawTracks.forEach((track) => {
                        let rawArtists = track.track.artists;
                        let artists = [];
                        rawArtists.forEach((artist) => {
                            artists.push(artist.name);
                        });
                        tracks.push(
                            {
                                artists: artists,
                                album: track.track.album.name,
                                name: track.track.name,
                            }
                        );
                    });
                    res.send(tracks);
                },
                (err) => {
                    console.log(err);
                    res.redirect('/');
                });
            }
            res.redirect('/');
        });
});

app.post('/api/add_song', (req, res) => {
    console.log('/add_song hit');
    console.log(req.body.songId);
    console.log('client is subscribing to add song')
        spotifyApi.addTracksToPlaylist(USER, PLAYLIST2, ['spotify:track:' + req.body.songId])
            .then(function(data) {
                console.log('Added tracks to playlist!');
                spotifyApi.getPlaylist(USER, PLAYLIST2)
                    .then((data) => {
                        let results = parsePlaylist(data, io.sockets);
                        io.sockets.emit('playlist', results);
                        res.send('success');
                        }, (err) => {
                        console.log(err);
                    })
            }, function(err) {
                console.log('Something went wrong!', err);
                res.send(err);
            });
});

app.post('/api/search_song', (req, res) => {
    console.log('/search_song hit');
    searchString = req.body.searchTerm;
    spotifyApi.searchTracks(searchString)
        .then(function(data) {
            var results = [];
            data.body.tracks.items.forEach((track) => {
                var artists = [];
                var track_id = track.id;
                var track_name = track.name;
                var album_name = track.album.name;

                track.album.artists.forEach((artist) => {
                    artists.push(artist.name)
                });

                results.push({id: track_id, name: track_name, album: album_name, artists: artists})
            });
            res.send(results);
        },
        (err) => {
            console.error(err);
            res.redirect('/');
        });
});

app.listen(3001);

const port = 8080;
io.listen(port);
console.log('listening on port ', port);