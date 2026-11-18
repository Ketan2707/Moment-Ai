import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { DEMO_USER_KETAN } from '@moment/shared';
import { EyeOff, Trophy, Users, Shield, Award } from 'lucide-react-native';

export default function MobileProfileScreen() {
  const [ghostMode, setGhostMode] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerSub}>EXPERIENCE PASSPORT</Text>
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: DEMO_USER_KETAN.avatar }}
          style={styles.avatar}
        />
        <View style={styles.levelBadge}>
          <Text style={styles.levelBadgeText}>
            Lvl {DEMO_USER_KETAN.momentLevel}
          </Text>
        </View>

        <Text style={styles.name}>{DEMO_USER_KETAN.name}</Text>
        <Text style={styles.username}>{DEMO_USER_KETAN.username}</Text>
        <Text style={styles.bio}>{DEMO_USER_KETAN.bio}</Text>

        {/* Badges */}
        <View style={styles.badgeRow}>
          {DEMO_USER_KETAN.badges.map((b, i) => (
            <View key={i} style={styles.badgePill}>
              <Text style={styles.badgeText}>{b}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            {DEMO_USER_KETAN.stats.momentsCount}
          </Text>
          <Text style={styles.statLabel}>Moments</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#C66A45' }]}>
            {DEMO_USER_KETAN.stats.challengesCount}
          </Text>
          <Text style={styles.statLabel}>Challenges</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#7B8062' }]}>
            {DEMO_USER_KETAN.xp}
          </Text>
          <Text style={styles.statLabel}>XP Earned</Text>
        </View>
      </View>

      {/* Privacy / Ghost Mode */}
      <View style={styles.privacyCard}>
        <View style={styles.privacyHeader}>
          <View>
            <Text style={styles.privacyTitle}>Ghost Mode</Text>
            <Text style={styles.privacySub}>
              Browse without appearing on nearby radars
            </Text>
          </View>
          <Switch
            value={ghostMode}
            onValueChange={setGhostMode}
            trackColor={{ false: '#DFD8CB', true: '#202020' }}
            thumbColor={ghostMode ? '#C66A45' : '#F7F3EA'}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EA',
  },
  content: {
    padding: 20,
    paddingTop: 54,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerSub: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7B8062',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#202020',
    marginTop: 2,
  },
  profileCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFD8CB',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#F7F3EA',
  },
  levelBadge: {
    backgroundColor: '#202020',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  levelBadgeText: {
    color: '#F7F3EA',
    fontSize: 11,
    fontWeight: '900',
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: '#202020',
  },
  username: {
    fontSize: 13,
    color: '#7B8062',
    fontWeight: '700',
    marginTop: 2,
  },
  bio: {
    fontSize: 12,
    color: '#686661',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    marginTop: 14,
  },
  badgePill: {
    backgroundColor: '#F7F3EA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#202020',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#EFE8DC',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#202020',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7B8062',
    marginTop: 2,
  },
  privacyCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  privacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privacyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#202020',
  },
  privacySub: {
    fontSize: 11,
    color: '#686661',
    marginTop: 2,
  },
});
