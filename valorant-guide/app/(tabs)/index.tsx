import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Valorant Guide</ThemedText>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('./agents')}>
        <ThemedText type="defaultSemiBold">Agents</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('./maps')}>
        <ThemedText type="defaultSemiBold">Maps</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('./guns')}>
        <ThemedText type="defaultSemiBold">Guns</ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('./ranks')}>
        <ThemedText type="defaultSemiBold">Ranks</ThemedText>
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
