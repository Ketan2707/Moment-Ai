import React, { useState } from 'react';
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
import { Sparkles, Trophy, Users, CheckCircle2 } from 'lucide-react-native';

export default function MobileMemoriesScreen() {
  const router = useRouter();
  const [squadKept, setSquadKept] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerSub}>MOMENT RECAPS</Text>
        <Text style={styles.headerTitle}>Your Memories</Text>
      </View>

      {/* Keepsake Card */}
      <View style={styles.memoryCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.eventTag}>TechFest 2026</Text>
          <Text style={styles.durationTag}>43 min</Text>
        </View>

        <Text style={styles.title}>Photography + Food Hunt</Text>

        {/* Participants */}
        <View style={styles.participantsRow}>
          {[DEMO_USER_KETAN, ...DEMO_RADAR_PEOPLE.slice(0, 3)].map((p, i) => (
            <View key={i} style={styles.participantPill}>
              <Image source={{ uri: p.avatar }} style={styles.pillAvatar} />
              <Text style={styles.pillName}>
                {i === 0 ? 'You' : p.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Route */}
        <View style={styles.routeBox}>
          <Text style={styles.routeText}>
            📸 Photography Zone → 🍕 Food Court → 🎤 Main Stage
          </Text>
        </View>

        {/* Photo Preview */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop&q=80',
          }}
          style={styles.photo}
        />

        {/* AI Recap */}
        <View style={styles.recapBox}>
          <Text style={styles.recapLabel}>AI RECAP</Text>
          <Text style={styles.recapText}>
            "You started with a photography challenge, discovered the food zone together, and ended the evening catching the acoustic sunset performance."
          </Text>
        </View>

        {/* Squad Actions */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.keepSquadBtn,
              squadKept && { backgroundColor: '#7B8062' },
            ]}
            onPress={() => setSquadKept(true)}
            activeOpacity={0.8}
          >
            <Users size={16} color="#F7F3EA" />
            <Text style={styles.keepSquadText}>
              {squadKept ? 'Squad Saved ✓' : 'KEEP SQUAD'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.endMomentBtn}
            onPress={() => router.push('/(tabs)/radar')}
          >
            <Text style={styles.endMomentText}>End Moment</Text>
          </TouchableOpacity>
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
  memoryCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#C66A45',
    textTransform: 'uppercase',
  },
  durationTag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7B8062',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#202020',
    marginBottom: 14,
  },
  participantsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  participantPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F7F3EA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  pillAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  pillName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#202020',
  },
  routeBox: {
    backgroundColor: '#F7F3EA',
    padding: 12,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  routeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#202020',
  },
  photo: {
    width: '100%',
    height: 180,
    borderRadius: 18,
    marginBottom: 14,
  },
  recapBox: {
    backgroundColor: '#E4DDD0',
    padding: 14,
    borderRadius: 16,
    marginBottom: 18,
  },
  recapLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7B8062',
  },
  recapText: {
    fontSize: 12,
    color: '#202020',
    fontWeight: '600',
    marginTop: 2,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  keepSquadBtn: {
    flex: 1,
    backgroundColor: '#C66A45',
    paddingVertical: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  keepSquadText: {
    color: '#F7F3EA',
    fontSize: 13,
    fontWeight: '800',
  },
  endMomentBtn: {
    flex: 1,
    backgroundColor: '#202020',
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endMomentText: {
    color: '#F7F3EA',
    fontSize: 13,
    fontWeight: '800',
  },
});
