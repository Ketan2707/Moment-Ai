import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { DEMO_RADAR_PEOPLE, DEMO_USER_KETAN } from '@moment/shared';
import { Hand, Sparkles, MapPin, Clock, X, Users, ArrowRight } from 'lucide-react-native';

export default function MobileRadarScreen() {
  const router = useRouter();
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);
  const [activeFilter, setActiveFilter] = useState('People');
  const [waveStatus, setWaveStatus] = useState<Record<string, string>>({});
  const [mutualModalUser, setMutualModalUser] = useState<any | null>(null);

  const filters = ['People', 'Nearby', 'Best Match', 'Surprise Me'];

  const handleWave = (personId: string) => {
    setWaveStatus((prev) => ({ ...prev, [personId]: 'sent' }));

    // Demo: Wave back after 1.2s
    setTimeout(() => {
      setWaveStatus((prev) => ({ ...prev, [personId]: 'mutual' }));
      const person = DEMO_RADAR_PEOPLE.find((p) => p.id === personId);
      if (person) {
        setSelectedPerson(null);
        setMutualModalUser(person);
      }
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>SOCIAL COMPASS</Text>
        <Text style={styles.headerTitle}>Moment Radar</Text>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterPill,
                activeFilter === f && styles.filterPillActive,
              ]}
              onPress={() => setActiveFilter(f)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === f && styles.filterPillTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Radar Canvas with Compass Rings */}
      <View style={styles.radarCanvas}>
        <View style={[styles.ring, styles.ringOuter]} />
        <View style={[styles.ring, styles.ringMid]} />
        <View style={[styles.ring, styles.ringInner]} />

        {/* Center: YOU */}
        <View style={styles.centerNode}>
          <Image
            source={{ uri: DEMO_USER_KETAN.avatar }}
            style={styles.centerAvatar}
          />
          <View style={styles.centerBadge}>
            <Text style={styles.centerBadgeText}>YOU</Text>
          </View>
        </View>

        {/* Floating Person 1: Rahul (Top Left) */}
        <TouchableOpacity
          style={[styles.personNode, { top: 60, left: 40 }]}
          onPress={() => setSelectedPerson(DEMO_RADAR_PEOPLE[0])}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: DEMO_RADAR_PEOPLE[0].avatar }}
            style={styles.personAvatar}
          />
          <View style={styles.chemistryBadge}>
            <Text style={styles.chemistryBadgeText}>84%</Text>
          </View>
          <Text style={styles.personName}>{DEMO_RADAR_PEOPLE[0].name}</Text>
        </TouchableOpacity>

        {/* Floating Person 2: Priya (Top Right) */}
        <TouchableOpacity
          style={[styles.personNode, { top: 70, right: 40 }]}
          onPress={() => setSelectedPerson(DEMO_RADAR_PEOPLE[1])}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: DEMO_RADAR_PEOPLE[1].avatar }}
            style={styles.personAvatar}
          />
          <View style={styles.chemistryBadge}>
            <Text style={styles.chemistryBadgeText}>78%</Text>
          </View>
          <Text style={styles.personName}>{DEMO_RADAR_PEOPLE[1].name}</Text>
        </TouchableOpacity>

        {/* Floating Person 3: Ananya (Bottom Right - Serendipity) */}
        <TouchableOpacity
          style={[styles.personNode, { bottom: 60, right: 50 }]}
          onPress={() => setSelectedPerson(DEMO_RADAR_PEOPLE[2])}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: DEMO_RADAR_PEOPLE[2].avatar }}
            style={[styles.personAvatar, { borderColor: '#7B8062' }]}
          />
          <View style={[styles.chemistryBadge, { backgroundColor: '#7B8062' }]}>
            <Text style={styles.chemistryBadgeText}>88%</Text>
          </View>
          <Text style={styles.personName}>{DEMO_RADAR_PEOPLE[2].name}</Text>
        </TouchableOpacity>

        {/* Floating Person 4: Arjun (Bottom Left) */}
        <TouchableOpacity
          style={[styles.personNode, { bottom: 70, left: 50 }]}
          onPress={() => setSelectedPerson(DEMO_RADAR_PEOPLE[3])}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: DEMO_RADAR_PEOPLE[3].avatar }}
            style={styles.personAvatar}
          />
          <View style={styles.chemistryBadge}>
            <Text style={styles.chemistryBadgeText}>72%</Text>
          </View>
          <Text style={styles.personName}>{DEMO_RADAR_PEOPLE[3].name}</Text>
        </TouchableOpacity>
      </View>

      {/* Person Detail Bottom Sheet Modal */}
      {selectedPerson && (
        <Modal animationType="slide" transparent visible={true}>
          <View style={styles.sheetOverlay}>
            <View style={styles.sheetContent}>
              <View style={styles.sheetHeader}>
                <Image
                  source={{ uri: selectedPerson.avatar }}
                  style={styles.sheetAvatar}
                />
                <View style={styles.sheetHeaderInfo}>
                  <Text style={styles.sheetName}>{selectedPerson.name}</Text>
                  <Text style={styles.sheetUsername}>
                    {selectedPerson.username}
                  </Text>
                  <View style={styles.sheetTagRow}>
                    <Text style={styles.sheetTag}>Nearby</Text>
                    <Text style={styles.sheetTag}>45 min</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedPerson(null)}
                  style={styles.closeButton}
                >
                  <X size={20} color="#686661" />
                </TouchableOpacity>
              </View>

              {/* Chemistry */}
              <View style={styles.chemistryCard}>
                <Text style={styles.chemistryLabel}>MOMENT CHEMISTRY</Text>
                <Text style={styles.chemistryScore}>84% Match</Text>
                <Text style={styles.matchReason}>
                  • Both want to explore campus
                </Text>
                <Text style={styles.matchReason}>
                  • Same available time window (45 min)
                </Text>
                <Text style={styles.matchReason}>
                  • Shared interest: Photography & Music
                </Text>
              </View>

              {/* Wave Button */}
              {waveStatus[selectedPerson.id] === 'sent' ? (
                <View style={styles.sentButton}>
                  <Text style={styles.sentButtonText}>Wave sent! 👋</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.waveButton}
                  onPress={() => handleWave(selectedPerson.id)}
                  activeOpacity={0.8}
                >
                  <Hand size={20} color="#F7F3EA" />
                  <Text style={styles.waveButtonText}>WAVE 👋</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}

      {/* Mutual Connection Success Modal */}
      {mutualModalUser && (
        <Modal animationType="fade" transparent visible={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalSub}>MUTUAL CONNECTION ESTABLISHED</Text>
              <Text style={styles.modalTitle}>YOU FOUND EACH OTHER!</Text>
              <Text style={styles.modalDesc}>
                You and {mutualModalUser.name} both waved. AI is ready to form a 4-person micro-moment experience.
              </Text>

              <TouchableOpacity
                style={styles.buildButton}
                onPress={() => {
                  setMutualModalUser(null);
                  router.push('/(tabs)/moments');
                }}
                activeOpacity={0.8}
              >
                <Sparkles size={18} color="#F7F3EA" />
                <Text style={styles.buildButtonText}>BUILD A MOMENT</Text>
                <ArrowRight size={18} color="#F7F3EA" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EA',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#EFE8DC',
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  filterPillActive: {
    backgroundColor: '#202020',
    borderColor: '#202020',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#686661',
  },
  filterPillTextActive: {
    color: '#F7F3EA',
  },
  radarCanvas: {
    flex: 1,
    margin: 20,
    borderRadius: 36,
    backgroundColor: '#EFE8DC',
    borderWidth: 1,
    borderColor: '#DFD8CB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ring: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D5CCBD',
  },
  ringOuter: {
    width: 320,
    height: 320,
  },
  ringMid: {
    width: 220,
    height: 220,
  },
  ringInner: {
    width: 140,
    height: 140,
  },
  centerNode: {
    alignItems: 'center',
    zIndex: 10,
  },
  centerAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#202020',
  },
  centerBadge: {
    backgroundColor: '#C66A45',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: -8,
  },
  centerBadgeText: {
    color: '#F7F3EA',
    fontSize: 10,
    fontWeight: '900',
  },
  personNode: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  personAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#C66A45',
  },
  chemistryBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#C66A45',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  chemistryBadgeText: {
    color: '#F7F3EA',
    fontSize: 9,
    fontWeight: '900',
  },
  personName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#202020',
    marginTop: 4,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: '#F7F3EA',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetAvatar: {
    width: 58,
    height: 58,
    borderRadius: 20,
  },
  sheetHeaderInfo: {
    flex: 1,
    marginLeft: 14,
  },
  sheetName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#202020',
  },
  sheetUsername: {
    fontSize: 12,
    color: '#7B8062',
    fontWeight: '600',
  },
  sheetTagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  sheetTag: {
    fontSize: 10,
    fontWeight: '700',
    color: '#686661',
    backgroundColor: '#EFE8DC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  closeButton: {
    padding: 6,
  },
  chemistryCard: {
    backgroundColor: '#EFE8DC',
    borderRadius: 20,
    padding: 16,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  chemistryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7B8062',
    letterSpacing: 0.8,
  },
  chemistryScore: {
    fontSize: 20,
    fontWeight: '900',
    color: '#C66A45',
    marginVertical: 2,
  },
  matchReason: {
    fontSize: 12,
    color: '#686661',
    marginTop: 2,
  },
  waveButton: {
    backgroundColor: '#C66A45',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  waveButtonText: {
    color: '#F7F3EA',
    fontSize: 15,
    fontWeight: '900',
  },
  sentButton: {
    backgroundColor: '#202020',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  sentButtonText: {
    color: '#F7F3EA',
    fontSize: 14,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#F7F3EA',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  modalSub: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7B8062',
    letterSpacing: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#202020',
    marginVertical: 6,
  },
  modalDesc: {
    fontSize: 13,
    color: '#686661',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  buildButton: {
    backgroundColor: '#C66A45',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buildButtonText: {
    color: '#F7F3EA',
    fontSize: 14,
    fontWeight: '900',
  },
});
