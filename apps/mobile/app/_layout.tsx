import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#F7F3EA" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F7F3EA' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="checkin"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Event Check-In',
            headerStyle: { backgroundColor: '#F7F3EA' },
            headerTintColor: '#202020',
          }}
        />
        <Stack.Screen
          name="intent"
          options={{
            presentation: 'card',
            headerShown: true,
            title: 'Set Your Moment',
            headerStyle: { backgroundColor: '#F7F3EA' },
            headerTintColor: '#202020',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
