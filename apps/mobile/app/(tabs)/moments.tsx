import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { DEMO_USER_KETAN, DEMO_RADAR_PEOPLE } from '@moment/shared';
import { Clock, MapPin, Trophy, Camera, Sparkles, RefreshCw } from 'lucide-react-native';

export default function MobileMomentsScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(32 * 60 + 14);
  const [challengeDone, setChallengeDone] = useState(false);
  const [replanned, setReplanned] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTimer = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Active Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerTop}>
          <Text style={styles.bannerSub}>MOMENT IN PROGRESS</Text>
          <View style={styles.timerBadge}>
            <Text style={styles.timerText}>{formatTimer(seconds)}</Text>
          </View>
        </View>

        <Text style={styles.momentTitle}>Photography + Food Hunt</Text>
        <Text style={styles.momentSub}>
          Quiet AI Director: Active stops adapting in real-time.
        </Text>

        {/* Squad Avatars */}
        <View style={styles.squadRow}>
          {[DEMO_USER_KETAN, ...DEMO_RADAR_PEOPLE.slice(0, 3)].map((m, i) => (
            <Image
              key={i}
              source={{ uri: m.avatar }}
              style={styles.squadAvatar}
            />
          ))}
          <Text style={styles.squadText}>4 people connected</Text>
        </View>
      </View>

      {/* Dynamic Replanning Notice if toggled */}
      {replanned && (
        <View style={styles.replanNotice}>
          <Text style={styles.replanTitle}>Plan Adapted ✨</Text>
          <Text style={styles.replanText}>
            Bypassed long Food Court queue → Routing to express treats stall.
          </Text>
        </View>
      )}

      {/* Current Stop */}
      <View style={styles.stopCardActive}>
        <View style={styles.stopHeader}>
          <Text style={styles.stopBadge}>CURRENT STOP (1 of 3)</Text>
          <Text style={styles.stopWalk}>3 min walk</Text>
        </View>
        <Text style={styles.stopTitle}>Golden Hour Silhouette Challenge</Text>
        <View style={styles.zoneRow}>
          <MapPin size={14} color="#C66A45" />
          <Text style={styles.zoneText}>Photography Zone</Text>
        </View>
        <Text style={styles.stopDesc}>
          Meet at the neon installation frames and capture one face-free photo.
        </Text>
      </View>

      {/* Next Stop */}
      <View style={styles.stopCard}>
        <Text style={styles.stopBadgeMuted}>NEXT STOP</Text>
        <Text style={styles.stopTitleMuted}>Food Court Street Treat Crawl</Text>
        <Text style={styles.zoneTextMuted}>Food Court & Market • 15 min</Text>
      </View>

      {/* Group Challenge */}
      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <Trophy size={18} color="#C66A45" />
          <Text style={styles.challengeLabel}>TODAY'S GROUP CHALLENGE</Text>
        </View>
        <Text style={styles.challengeTitle}>College Life Without Faces</Text>
        <Text style={styles.challengeDesc}>
          Take one creative group photo representing college life without showing faces.
        </Text>

        {challengeDone ? (
          <View style={styles.doneBadge}>
            <Text style={styles.doneBadgeText}>Challenge Completed! (+250 XP)</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.challengeButton}
            onPress={() => setChallengeDone(true)}
            activeOpacity={0.8}
          >
            <Camera size={18} color="#F7F3EA" />
            <Text style={styles.challengeButtonText}>
              Snap & Mark Challenge Done
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Action Controls */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setReplanned(!replanned)}
        >
          <RefreshCw size={14} color="#202020" />
          <Text style={styles.secondaryButtonText}>Simulate Replan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.concludeButton}
          onPress={() => router.push('/(tabs)/memories')}
          activeOpacity={0.8}
        >
          <Sparkles size={16} color="#F7F3EA" />
          <Text style={styles.concludeButtonText}>View Memory</Text>
        </TouchableOpacity>
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
  banner: {
    backgroundColor: '#202020',
    borderRadius: 28,
    padding: 22,
    marginBottom: 20,
  },
  bannerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerSub: {
    color: '#DE835F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  timerBadge: {
    backgroundColor: '#151515',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timerText: {
    color: '#F7F3EA',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'monospace',
  },
  momentTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#F7F3EA',
  },
  momentSub: {
    fontSize: 12,
    color: '#A3A3A3',
    marginTop: 4,
  },
  squadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: -6,
  },
  squadAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#202020',
  },
  squadText: {
    color: '#A3A3A3',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 14,
  },
  replanNotice: {
    backgroundColor: '#7B8062',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  replanTitle: {
    color: '#F7F3EA',
    fontSize: 13,
    fontWeight: '800',
  },
  replanText: {
    color: '#EFE8DC',
    fontSize: 12,
    marginTop: 2,
  },
  stopCardActive: {
    backgroundColor: '#EFE8DC',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#C66A45',
    marginBottom: 14,
  },
  stopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stopBadge: {
    color: '#C66A45',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  stopWalk: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7B8062',
  },
  stopTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#202020',
  },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  zoneText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C66A45',
  },
  stopDesc: {
    fontSize: 12,
    color: '#686661',
    marginTop: 8,
  },
  stopCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DFD8CB',
    marginBottom: 18,
  },
  stopBadgeMuted: {
    fontSize: 10,
    fontWeight: '800',
    color: '#686661',
  },
  stopTitleMuted: {
    fontSize: 15,
    fontWeight: '800',
    color: '#202020',
    marginTop: 2,
  },
  zoneTextMuted: {
    fontSize: 11,
    color: '#7B8062',
    marginTop: 2,
  },
  challengeCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#DFD8CB',
    marginBottom: 20,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#C66A45',
    letterSpacing: 0.8,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#202020',
    marginTop: 4,
  },
  challengeDesc: {
    fontSize: 12,
    color: '#686661',
    marginTop: 4,
    marginBottom: 14,
  },
  challengeButton: {
    backgroundColor: '#202020',
    paddingVertical: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  challengeButtonText: {
    color: '#F7F3EA',
    fontSize: 13,
    fontWeight: '800',
  },
  doneBadge: {
    backgroundColor: '#7B8062',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneBadgeText: {
    color: '#F7F3EA',
    fontSize: 12,
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#EFE8DC',
    borderWidth: 1,
    borderColor: '#DFD8CB',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryButtonText: {
    color: '#202020',
    fontSize: 13,
    fontWeight: '700',
  },
  concludeButton: {
    flex: 1,
    backgroundColor: '#C66A45',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  concludeButtonText: {
    color: '#F7F3EA',
    fontSize: 13,
    fontWeight: '800',
  },
});
