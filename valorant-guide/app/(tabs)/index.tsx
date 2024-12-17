import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Valorant Guide</ThemedText>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/tabs/agents')}>
        <ThemedText type="buttonText">Agents</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/tabs/maps')}>
        <ThemedText type="buttonText">Maps</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/tabs/guns')}>
        <ThemedText type="buttonText">Guns</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/tabs/ranks')}>
        <ThemedText type="buttonText">Ranks</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: '#1D3D47',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
