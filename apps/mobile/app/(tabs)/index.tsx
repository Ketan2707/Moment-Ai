import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { DEMO_EVENT, DEMO_USER_KETAN } from '@moment/shared';
import { MapPin, Users, ArrowRight, Camera, Utensils, Music, Gamepad2 } from 'lucide-react-native';

export default function MobileHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greetingSub}>Hey {DEMO_USER_KETAN.name} 👋</Text>
        <Text style={styles.heading}>What's happening today?</Text>
      </View>

      {/* Main Event Card */}
      <View style={styles.eventCard}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LIVE FESTIVAL</Text>
        </View>

        <Text style={styles.eventTitle}>{DEMO_EVENT.name}</Text>
        <Text style={styles.eventVenue}>{DEMO_EVENT.venue}</Text>

        <View style={styles.statsRow}>
          <Users size={16} color="#7B8062" />
          <Text style={styles.statsText}>
            {DEMO_EVENT.totalCheckedIn.toLocaleString()} people here
          </Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/intent')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>ENTER EVENT</Text>
          <ArrowRight size={18} color="#F7F3EA" />
        </TouchableOpacity>
      </View>

      {/* Live Now Activities */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>LIVE NOW</Text>
        <Text style={styles.sectionSub}>Quick activities starting in your zone</Text>
      </View>

      {DEMO_EVENT.activities.map((act) => (
        <TouchableOpacity
          key={act.id}
          style={styles.activityCard}
          onPress={() => router.push('/(tabs)/radar')}
          activeOpacity={0.7}
        >
          <View style={styles.activityIcon}>
            {act.icon === 'Camera' ? (
              <Camera size={20} color="#C66A45" />
            ) : act.icon === 'Utensils' ? (
              <Utensils size={20} color="#C66A45" />
            ) : act.icon === 'Music' || act.icon === 'Mic' ? (
              <Music size={20} color="#C66A45" />
            ) : (
              <Gamepad2 size={20} color="#C66A45" />
            )}
          </View>
          <View style={styles.activityInfo}>
            <Text style={styles.activityTime}>{act.timeSlot}</Text>
            <Text style={styles.activityTitle}>{act.title}</Text>
            <Text style={styles.activityDesc} numberOfLines={2}>
              {act.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  greetingSub: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7B8062',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: '#202020',
    marginTop: 4,
  },
  eventCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: '#DFD8CB',
    marginBottom: 28,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#202020',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    color: '#F7F3EA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  eventTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#202020',
  },
  eventVenue: {
    fontSize: 14,
    color: '#686661',
    fontWeight: '600',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 20,
  },
  statsText: {
    fontSize: 13,
    color: '#7B8062',
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#C66A45',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#F7F3EA',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#202020',
  },
  sectionSub: {
    fontSize: 12,
    color: '#7B8062',
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DFD8CB',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F7F3EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTime: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7B8062',
    textTransform: 'uppercase',
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#202020',
    marginTop: 2,
  },
  activityDesc: {
    fontSize: 11,
    color: '#686661',
    marginTop: 2,
  },
});
