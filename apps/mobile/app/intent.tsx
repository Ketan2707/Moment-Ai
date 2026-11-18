import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Check, Compass, Sparkles } from 'lucide-react-native';

export default function MobileIntentScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState('explore');
  const [time, setTime] = useState(45);
  const [energy, setEnergy] = useState('small_groups');
  const [interests, setInterests] = useState(['Photography', 'Music']);

  const intentCards = [
    { id: 'explore', label: 'Explore', desc: 'Wander and discover' },
    { id: 'photo', label: 'Photo Walk', desc: 'Angles & group shots' },
    { id: 'food', label: 'Grab Food', desc: 'Trucks & street snacks' },
    { id: 'meet', label: 'Meet People', desc: 'Connect with strangers' },
    { id: 'team', label: 'Find Team', desc: 'Hackathon partners' },
    { id: 'watch', label: 'Watch Shows', desc: 'Acoustic sets & stages' },
  ];

  const timeOptions = [
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min (Recommended)' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2+ hours' },
  ];

  const energyOptions = [
    { id: 'very_social', label: 'Very Social ⚡' },
    { id: 'comfortable', label: 'Comfortable & Open 😊' },
    { id: 'small_groups', label: 'Small Groups 👥' },
    { id: 'low_key', label: 'Low-key Chill ☕' },
  ];

  const allInterests = [
    'Photography',
    'Music',
    'Gaming',
    'Coding',
    'Startups',
    'Food',
    'Travel',
    'Art',
  ];

  const toggleInterest = (i: string) => {
    if (interests.includes(i)) {
      if (interests.length > 1) setInterests(interests.filter((x) => x !== i));
    } else {
      setInterests([...interests, i]);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Progress Dots */}
      <View style={styles.progressRow}>
        {[1, 2, 3, 4].map((s) => (
          <View
            key={s}
            style={[
              styles.dot,
              s === step ? styles.dotActive : s < step ? styles.dotDone : null,
            ]}
          />
        ))}
      </View>

      {/* Step 1 */}
      {step === 1 && (
        <View>
          <Text style={styles.subTitle}>STEP 1 OF 4</Text>
          <Text style={styles.title}>What do you feel like doing?</Text>

          <View style={styles.cardGrid}>
            {intentCards.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[
                  styles.card,
                  intent === c.id && styles.cardSelected,
                ]}
                onPress={() => setIntent(c.id)}
              >
                <Text
                  style={[
                    styles.cardTitle,
                    intent === c.id && styles.cardTitleSelected,
                  ]}
                >
                  {c.label}
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    intent === c.id && styles.cardDescSelected,
                  ]}
                >
                  {c.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setStep(2)}
            activeOpacity={0.8}
          >
            <Text style={styles.nextBtnText}>Next: Time Budget</Text>
            <ArrowRight size={18} color="#F7F3EA" />
          </TouchableOpacity>
        </View>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <View>
          <Text style={styles.subTitle}>STEP 2 OF 4</Text>
          <Text style={styles.title}>How much time do you have?</Text>

          <View style={styles.listCol}>
            {timeOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[
                  styles.listRow,
                  time === opt.value && styles.cardSelected,
                ]}
                onPress={() => setTime(opt.value)}
              >
                <Text
                  style={[
                    styles.listRowText,
                    time === opt.value && styles.cardTitleSelected,
                  ]}
                >
                  {opt.label}
                </Text>
                {time === opt.value && <Check size={18} color="#C66A45" />}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setStep(3)}
            activeOpacity={0.8}
          >
            <Text style={styles.nextBtnText}>Next: Social Energy</Text>
            <ArrowRight size={18} color="#F7F3EA" />
          </TouchableOpacity>
        </View>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <View>
          <Text style={styles.subTitle}>STEP 3 OF 4</Text>
          <Text style={styles.title}>What's your social energy?</Text>

          <View style={styles.listCol}>
            {energyOptions.map((opt) => (
              <TouchableOpacity
                key={opt.id}
                style={[
                  styles.listRow,
                  energy === opt.id && styles.cardSelected,
                ]}
                onPress={() => setEnergy(opt.id)}
              >
                <Text
                  style={[
                    styles.listRowText,
                    energy === opt.id && styles.cardTitleSelected,
                  ]}
                >
                  {opt.label}
                </Text>
                {energy === opt.id && <Check size={18} color="#C66A45" />}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => setStep(4)}
            activeOpacity={0.8}
          >
            <Text style={styles.nextBtnText}>Next: Passions</Text>
            <ArrowRight size={18} color="#F7F3EA" />
          </TouchableOpacity>
        </View>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <View>
          <Text style={styles.subTitle}>STEP 4 OF 4</Text>
          <Text style={styles.title}>What are you into today?</Text>

          <View style={styles.pillGrid}>
            {allInterests.map((interest) => {
              const active = interests.includes(interest);
              return (
                <TouchableOpacity
                  key={interest}
                  style={[styles.interestPill, active && styles.interestActive]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text
                    style={[
                      styles.interestText,
                      active && styles.interestTextActive,
                    ]}
                  >
                    {interest} {active ? '✓' : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => router.push('/(tabs)/radar')}
            activeOpacity={0.8}
          >
            <Sparkles size={18} color="#F7F3EA" />
            <Text style={styles.nextBtnText}>LAUNCH RADAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EA',
  },
  content: {
    padding: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DFD8CB',
  },
  dotActive: {
    width: 36,
    backgroundColor: '#C66A45',
  },
  dotDone: {
    backgroundColor: '#7B8062',
  },
  subTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7B8062',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#202020',
    marginTop: 4,
    marginBottom: 20,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: '#EFE8DC',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  cardSelected: {
    backgroundColor: '#202020',
    borderColor: '#202020',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#202020',
  },
  cardTitleSelected: {
    color: '#F7F3EA',
  },
  cardDesc: {
    fontSize: 11,
    color: '#686661',
    marginTop: 4,
  },
  cardDescSelected: {
    color: '#EFE8DC',
  },
  listCol: {
    gap: 10,
    marginBottom: 24,
  },
  listRow: {
    backgroundColor: '#EFE8DC',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  listRowText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#202020',
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 28,
  },
  interestPill: {
    backgroundColor: '#EFE8DC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DFD8CB',
  },
  interestActive: {
    backgroundColor: '#202020',
    borderColor: '#202020',
  },
  interestText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#202020',
  },
  interestTextActive: {
    color: '#F7F3EA',
  },
  nextBtn: {
    backgroundColor: '#C66A45',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextBtnText: {
    color: '#F7F3EA',
    fontSize: 14,
    fontWeight: '800',
  },
});
