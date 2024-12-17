import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define the type for an agent
interface Agent {
  uuid: string;
  displayName: string;
  displayIcon: string;
  role: {
    displayName: string;
  } | null;
}

export default function AgentsScreen() {
  const [agents, setAgents] = useState<Agent[]>([]); // Use the Agent type for the state

  useEffect(() => {
    // Fetch Agents data from Valorant API
    fetch('https://valorant-api.com/v1/agents')
      .then((res) => res.json())
      .then((data) => setAgents(data.data)) // Assuming data.data contains the agent array
      .catch((err) => console.error(err));
  }, []);

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
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
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
