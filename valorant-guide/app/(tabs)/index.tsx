import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ValorantGuideScreen() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the Valorant API
    fetch('https://valorant-api.com/v1/agents') // Example endpoint for agents
      .then((response) => response.json())
      .then((data) => {
        setAgents(data.data); // Adjust based on API response structure
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching Valorant data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <ThemedText>Loading Agents...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={agents}
      keyExtractor={(item) => item.uuid}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <ThemedView style={styles.agentCard}>
          <Image source={{ uri: item.displayIcon }} style={styles.agentImage} />
          <ThemedText type="title">{item.displayName}</ThemedText>
          <ThemedText>{item.role?.displayName || 'No Role'}</ThemedText>
          <ThemedText>{item.description || 'No Description'}</ThemedText>
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#1D3D47',
    alignItems: 'center',
  },
  agentImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
});
