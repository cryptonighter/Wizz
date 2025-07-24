-- Users & Access Control
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE TABLE passphrases (
    id UUID PRIMARY KEY,
    phrase_hash TEXT UNIQUE NOT NULL,
    is_claimed BOOLEAN DEFAULT FALSE,
    claimed_by_user_id UUID REFERENCES users(id)
);

-- Compass: The User's Core Identity
CREATE TABLE compasses (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    superpower JSONB, -- Stores the final value AND the raw exploration text
    hues JSONB,
    values TEXT[],
    skills JSONB[],
    travel_style JSONB
);

-- Quests: The Engine of Action & Reflection
CREATE TABLE quests (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'active'
);

CREATE TABLE quest_check_ins (
    id UUID PRIMARY KEY,
    quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    data JSONB NOT NULL, -- Stores structured {win, obstacle}
    obstacle_vector vector(384) -- This prepares for our future AI. Can be NULL in V1.
);