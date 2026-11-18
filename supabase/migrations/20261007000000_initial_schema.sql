-- MOMENT: AI-Powered Real-World Social Companion
-- Supabase PostgreSQL Schema Migration

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (linked with Supabase auth.users or standalone for demo)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  moment_level INT DEFAULT 1,
  xp INT DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  ghost_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Events
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  venue VARCHAR(200) NOT NULL,
  organization VARCHAR(200) NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  qr_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Event Zones
CREATE TABLE IF NOT EXISTS event_zones (
  id VARCHAR(100) PRIMARY KEY,
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  crowd_level VARCHAR(20) DEFAULT 'moderate', -- 'low', 'moderate', 'high', 'peak'
  icon VARCHAR(50) DEFAULT 'MapPin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Event Activities
CREATE TABLE IF NOT EXISTS activities (
  id VARCHAR(100) PRIMARY KEY,
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  zone_id VARCHAR(100) REFERENCES event_zones(id) ON DELETE SET NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  time_slot VARCHAR(100),
  icon VARCHAR(50) DEFAULT 'Activity',
  capacity INT DEFAULT 50,
  current_count INT DEFAULT 0,
  is_sponsored BOOLEAN DEFAULT FALSE,
  sponsor_name VARCHAR(100),
  sponsor_reward TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Event Members (Check-in status)
CREATE TABLE IF NOT EXISTS event_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'attendee', -- 'attendee', 'organizer', 'admin'
  checked_in_at TIMESTAMPTZ DEFAULT NOW(),
  current_zone_id VARCHAR(100) REFERENCES event_zones(id),
  UNIQUE(event_id, profile_id)
);

-- 6. User Intents (What the user wants to do right now)
CREATE TABLE IF NOT EXISTS user_intents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  primary_intent VARCHAR(50) NOT NULL,
  time_available_minutes INT NOT NULL,
  social_energy VARCHAR(50) NOT NULL,
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Presence (Approximate location, last active timestamp)
CREATE TABLE IF NOT EXISTS presence (
  profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  zone_id VARCHAR(100) REFERENCES event_zones(id),
  is_active BOOLEAN DEFAULT TRUE,
  last_seen_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Waves (Mutual social handshake)
CREATE TABLE IF NOT EXISTS waves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Connections (Confirmed mutual connections)
CREATE TABLE IF NOT EXISTS connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_a UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_b UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_a, user_b, event_id)
);

-- 10. Moments (Temporary shared experiences formed by AI)
CREATE TABLE IF NOT EXISTS moments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  duration_minutes INT NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'abandoned'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 11. Moment Members
CREATE TABLE IF NOT EXISTS moment_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moment_id UUID REFERENCES moments(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(moment_id, profile_id)
);

-- 12. Moment Route / Stops
CREATE TABLE IF NOT EXISTS moment_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moment_id UUID REFERENCES moments(id) ON DELETE CASCADE,
  zone_name VARCHAR(100) NOT NULL,
  step_order INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  walk_time_minutes INT DEFAULT 3,
  status VARCHAR(20) DEFAULT 'pending' -- 'pending', 'current', 'completed'
);

-- 13. Moment Challenges
CREATE TABLE IF NOT EXISTS moment_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moment_id UUID REFERENCES moments(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'photo',
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  reward_xp INT DEFAULT 150
);

-- 14. Moment Memories (Permanent keepsake after moment concludes)
CREATE TABLE IF NOT EXISTS moment_memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  moment_id UUID REFERENCES moments(id) ON DELETE SET NULL,
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  event_name VARCHAR(200) NOT NULL,
  duration_minutes INT NOT NULL,
  ai_recap TEXT NOT NULL,
  stops TEXT[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Squads (When a moment group decides to stay in touch)
CREATE TABLE IF NOT EXISTS squads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  origin_moment_id UUID REFERENCES moments(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS squad_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  squad_id UUID REFERENCES squads(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(squad_id, profile_id)
);

-- 16. Live Moments (Temporary public hangout requests)
CREATE TABLE IF NOT EXISTS live_moments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id VARCHAR(100) REFERENCES events(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50) NOT NULL,
  approximate_zone VARCHAR(100) NOT NULL,
  target_count INT DEFAULT 3,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Safety: Reports & Blocks
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reported_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_event_members_event ON event_members(event_id);
CREATE INDEX IF NOT EXISTS idx_presence_event ON presence(event_id);
CREATE INDEX IF NOT EXISTS idx_waves_receiver ON waves(receiver_id);
CREATE INDEX IF NOT EXISTS idx_moments_event ON moments(event_id);
