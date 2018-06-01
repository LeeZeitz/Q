from django.shortcuts import render, reverse
from django.http import HttpResponse, JsonResponse
from django.template import loader
from .forms import SongSearchForm
import spotipy
import spotipy.util as util
import pprint

# Create your views here.

username = '12179492604'
scope = 'playlist-modify-private playlist-read-private playlist-read-collaborative playlist-modify-public user-library-read user-read-currently-playing user-modify-playback-state user-read-playback-state	'
token = ''
playlist_id = '1StamdXw2oxcPS9dz7prj9'
client_id = '69168ba4471f42809b6d05001e90a003'
client_secret = 'e5ee88972d714db1b0518e60e7004cd9'

def get_token():
    return util.prompt_for_user_token('12179492604',scope,client_id=client_id,client_secret=client_secret, redirect_uri='http://192.168.1.86:8080/')


def search_songs(request):
    global token
    form = SongSearchForm()

    if request.method == 'GET':
        return render(request, 'playlist_management/add_songs_base.html', {'form': form})
    
    elif request.method == 'POST':
        search_string = request.POST['song_search']
        if not token:
            token = get_token()
        sp = spotipy.Spotify(auth=token)
        try:
            result = sp.search(search_string)
        except:
            token = get_token()
            sp = spotipy.Spotify(auth=token)
            result = sp.search(search_string)

        results = []
        for track in result['tracks']['items']:
            artists = []
            track_id = track['id']
            track_name = track['name']
            explicit = track['explicit']
            album_name = track['album']['name']
            for artist in track['album']['artists']:
                artists.append(artist['name'])
            '''
            print (track_id)
            print (track_name)
            print (album_name)
            print (artists)
            print ('\n')
            '''
            results.append({'track_id': track_id, 'track_name': track_name, 'album_name': album_name, 'artists': artists, 'explicit': explicit})
        return render(request, 'playlist_management/add_songs_m.html', {'form': form, 'results': results})

def add_songs(request):
    global token
    if request.method == 'POST':
        track_id = [request.POST['track_id']]
        sp = spotipy.Spotify(auth=token)
        sp.trace = False
        try:
            sp.user_playlist_add_tracks(username, playlist_id, track_id)
        except:
            token = get_token()
            sp = spotipy.Spotify(auth=token)
            sp.user_playlist_add_tracks(username, playlist_id, track_id)

        result = {}
        result['data'] = {
            'result': 'song added to queue'
        }
        return JsonResponse(result)

    else:
        return HttpResponse(status=404)

def view_playlist(request):
    global token
    if request.method == 'POST':
        return HttpResponse(status=404)
    elif request.method == 'GET':

        sp = spotipy.Spotify(auth=token)
        try:
            results = sp.user_playlist(username, playlist_id)
        except:
            token = get_token()
            sp = spotipy.Spotify(auth=token)
            results = sp.user_playlist(username, playlist_id)

        tracks = []

        for thing in results['tracks']['items']:
            track = thing['track']
            artists = []
            track_name = track['name']
            album_name = track['album']['name']
            for artist in track['album']['artists']:
                artists.append(artist['name'])

            tracks.append({'track_name': track_name, 'album_name': album_name, 'artists': artists})
            
        #pprint.pprint(tracks)
        
        return render(request, 'playlist_management/playlist_m.html', {'tracks': tracks})
