-- Seed data for TechFest 2026

INSERT INTO events (id, name, venue, organization, description, start_time, end_time, qr_code)
VALUES (
  'techfest-2026',
  'TechFest 2026',
  'Chandigarh University Campus',
  'TechFest Society',
  'Northern India’s largest university fest featuring tech hackathons, esports, live concerts, creative workshops & cultural food markets.',
  NOW() - INTERVAL '2 hours',
  NOW() + INTERVAL '10 hours',
  'MOMENT_EVENT:techfest-2026'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO event_zones (id, event_id, name, description, crowd_level, icon)
VALUES
  ('z-photo', 'techfest-2026', 'Photography Zone', 'Golden hour installations, aesthetic backdrops & neon portraits', 'moderate', 'Camera'),
  ('z-food', 'techfest-2026', 'Food Court & Market', 'Artisanal trucks, street treats & open seating courtyard', 'high', 'Utensils'),
  ('z-stage', 'techfest-2026', 'Main Stage Amphitheatre', 'Live indie acoustic sets, battle of the bands & keynote speakers', 'peak', 'Music'),
  ('z-gaming', 'techfest-2026', 'Gaming & Arcade Arena', 'LAN matches, VR simulator arena & retro arcade booths', 'peak', 'Gamepad2'),
  ('z-hack', 'techfest-2026', 'Hackathon Arena', '36-hour sprint arena, mentorship hub & team lounge', 'moderate', 'Code'),
  ('z-chill', 'techfest-2026', 'Chill Lawn & Beanbags', 'Low-fi ambient music, fairy lights & board games', 'low', 'Coffee')
ON CONFLICT (id) DO NOTHING;

INSERT INTO activities (id, event_id, zone_id, title, description, time_slot, icon, capacity, current_count, is_sponsored, sponsor_name, sponsor_reward)
VALUES
  ('act-1', 'techfest-2026', 'z-photo', 'College Life Silhouette Photo Walk', 'Capture candid architectural shots of campus life without faces.', 'Live Now', 'Camera', 30, 14, FALSE, NULL, NULL),
  ('act-2', 'techfest-2026', 'z-food', 'Secret Food Hunt', 'Taste test the viral fusion roll and find the hidden spiced churro truck.', 'Continuous', 'Utensils', 50, 38, FALSE, NULL, NULL),
  ('act-3', 'techfest-2026', 'z-stage', 'Sunset Acoustic Jam', 'Unplugged covers by student artists on the amphitheatre grass.', 'Starting in 15m', 'Mic', 200, 145, FALSE, NULL, NULL),
  ('act-4', 'techfest-2026', 'z-hack', 'Team Matching Flash Pitch', 'Connect with a frontend, ML, or design teammate in 5 minutes.', 'Ongoing', 'Users', 40, 22, TRUE, 'GitHub Campus', 'Exclusive GitHub Swag & Dev Credits')
ON CONFLICT (id) DO NOTHING;
