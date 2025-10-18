CREATE TABLE IF NOT EXISTS candle_lights (
    id SERIAL PRIMARY KEY,
    social_network VARCHAR(50) NOT NULL,
    post_id VARCHAR(255) NOT NULL UNIQUE,
    user_name VARCHAR(255),
    user_avatar TEXT,
    text TEXT,
    image_url TEXT,
    city VARCHAR(100),
    venue VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parsed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_candle_lights_city ON candle_lights(city);
CREATE INDEX idx_candle_lights_venue ON candle_lights(venue);
CREATE INDEX idx_candle_lights_created_at ON candle_lights(created_at);
CREATE INDEX idx_candle_lights_social_network ON candle_lights(social_network);