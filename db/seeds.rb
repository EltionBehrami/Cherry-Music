# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    User.destroy_all 

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating users..."

    User.create!(
    first_name: 'Eltion', 
    last_name: 'Behrami', 
    birthdate: Faker::Date.birthday(min_age: 18, max_age: 65),
    email: 'demo@user.io', 
    password: 'password',
    )

    10.times do 
        User.create!({
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            birthdate: Faker::Date.birthday(min_age: 18, max_age: 65),
            email: Faker::Internet.unique.email,
            password: 'password'
        }) 
    end

    Artist.create!({
        name: "test artist"
    })

    20.times do Album.create!({
        title: Faker::Music.album, 
        artist_id: 1, 
        album_cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/67/f8/0c/67f80cef-4d4e-4792-1c69-c1d614065005/197189165450.jpg/296x296bf.webp",
        genre: Faker::Music.genre

    })
end

    50.times do Song.create!({
        title: Faker::Music::RockBand.song,
        artist_id: 1,
        album_id: rand(1..20),
        song_url: "/Users/eltionbehrami/apple_music_clone/frontend/src/01 The Adults Are Talking.mp3"
    })
end 


    puts "Done!"

end 