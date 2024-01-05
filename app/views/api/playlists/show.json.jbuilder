json.extract! @playlist, :id, :title, :description, :created_at, :updated_at
json.playlist_songs @playlist.songs.pluck(:id)
json.playlist_song_ids @playlist.playlist_songs.pluck(:id)
