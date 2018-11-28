## Q

This is a Node.js/React.js/Socket.io web application to allow users to add songs to a communal queue, without the need to install any applications or make any accounts. There was a time and a place for "there's an app for that", but with people's phones getting more and more cluttered with apps they only use a few times, it seems to me that web applications are the new thing.

This application allows the admin (me) to supply their Spotify API key and a setup playlist for the application to use. Then, users can search and add songs to that playlist. The experience to the users is that they are adding songs to a queue, which under the hood is really just a playlist.

I used Socket.io so that when one user adds a song and another user is looking at the upcoming queue, the song that first user added pops up at the bottom of the queue without any refreshing. 

There's a live demo off this here: q.leezeitz.com
