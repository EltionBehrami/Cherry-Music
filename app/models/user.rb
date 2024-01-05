class User < ApplicationRecord
    has_secure_password 
    
    before_validation :ensure_session_token
    validates :email, :session_token, presence: true, uniqueness: true 
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, length: { in: 3..255 }
    validates :first_name, :last_name, presence: true
    validates :password, length: {minimum: 6}, allow_nil: true

    has_many :playlists, dependent: :destroy 
    has_many :playlist_songs, through: :playlists, source: :songs
    

    def self.find_by_credentials(email, password) 
        user = User.find_by(email: email) 
        if user && user.authenticate(password)
            user 
        else 
            nil
        end 
    end 

    def reset_session_token! 
        self.session_token = generate_session_token 
        self.save! 
        self.session_token
    end 


    private 
    
    def generate_session_token 
        loop do 
            session_token = SecureRandom.base64
            break session_token unless User.exists?(session_token: session_token)
        end 
    end 

    def ensure_session_token
        self.session_token ||= generate_session_token
    end 



end
