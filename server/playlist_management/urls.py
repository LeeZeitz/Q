from . import views
from django.urls import path

urlpatterns = [
    path('', views.search_songs, name='search_songs'),
    path('add_songs', views.add_songs, name='add_songs'),
    path('playlist', views.view_playlist, name='view_playlist')
]
