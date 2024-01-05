@playlist_songs.each do |playlist_song|
    json.set! playlist_song.id do 
        json.extract! playlist_song,  :id, :title, :created_at, :updated_at
    end 
end 
