-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by_code VARCHAR(50),
    total_referrals INT DEFAULT 0,
    bonus_balance DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по реферальному коду
CREATE INDEX idx_referral_code ON users(referral_code);
CREATE INDEX idx_referred_by ON users(referred_by_code);

-- Таблица реферальных бонусов
CREATE TABLE IF NOT EXISTS referral_rewards (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    referred_user_id INT REFERENCES users(id),
    reward_amount DECIMAL(10, 2) NOT NULL,
    reward_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица подписок пользователей на соцсети
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    platform VARCHAR(50) NOT NULL,
    bonus_claimed BOOLEAN DEFAULT FALSE,
    bonus_amount DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Уникальный индекс: один бонус за платформу
CREATE UNIQUE INDEX idx_user_platform ON user_subscriptions(user_id, platform);