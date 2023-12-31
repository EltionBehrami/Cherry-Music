
@albums.each do |album|
    json.set! album.id do 
        json.extract! album, :id, :title, :artist_id, :album_cover, :genre, :created_at, :updated_at
        json.set! 'artist_name', album.artist.name
    end 
end 