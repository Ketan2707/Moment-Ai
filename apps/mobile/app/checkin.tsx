import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { DEMO_EVENT } from '@moment/shared';
import { QrCode, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react-native';

export default function MobileCheckInScreen() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  return (
    <View style={styles.container}>
      {!verified ? (
        <View style={styles.content}>
          <Text style={styles.subTitle}>PHYSICAL VERIFICATION</Text>
          <Text style={styles.title}>Scan Event Gate Code</Text>
          <Text style={styles.desc}>
            Verify you are physically attending {DEMO_EVENT.name}.
          </Text>

          <View style={styles.scannerBox}>
            <QrCode size={90} color="#EFE8DC" />
            <Text style={styles.scanText}>Point at Gate QR Code</Text>
          </View>

          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => setVerified(true)}
            activeOpacity={0.8}
          >
            <Sparkles size={18} color="#F7F3EA" />
            <Text style={styles.demoButtonText}>Use Demo Check-In</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.successIcon}>
            <CheckCircle2 size={40} color="#7B8062" />
          </View>
          <Text style={styles.subTitle}>VERIFIED ✓</Text>
          <Text style={styles.title}>Welcome to {DEMO_EVENT.name}!</Text>
          <Text style={styles.desc}>
            You are checked in with 2,304 active attendees. Set your moment intent to start discovering.
          </Text>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.push('/intent')}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>SET MY MOMENT</Text>
            <ArrowRight size={18} color="#F7F3EA" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3EA',
    padding: 24,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7B8062',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#202020',
    marginTop: 4,
    textAlign: 'center',
  },
  desc: {
    fontSize: 13,
    color: '#686661',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 24,
    maxWidth: 280,
  },
  scannerBox: {
    width: 240,
    height: 240,
    backgroundColor: '#202020',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  scanText: {
    color: '#A3A3A3',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 12,
  },
  demoButton: {
    backgroundColor: '#C66A45',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  demoButtonText: {
    color: '#F7F3EA',
    fontSize: 14,
    fontWeight: '800',
  },
  successIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(123,128,98,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#202020',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#F7F3EA',
    fontSize: 14,
    fontWeight: '800',
  },
});
