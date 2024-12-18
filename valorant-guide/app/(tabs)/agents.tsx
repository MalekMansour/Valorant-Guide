import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Animated, { FadeIn } from 'react-native-reanimated';

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
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    // Fetch Agents data from Valorant API
    fetch('https://valorant-api.com/v1/agents')
      .then((res) => res.json())
      .then((data) => setAgents(data.data))
      .catch((err) => console.error(err));
  }, []);

  // Get the device width for responsive layout
  const numColumns = 5;
  const screenWidth = Dimensions.get('window').width;
  const cardSize = screenWidth / numColumns - 16; 

  return (
    <FlatList
      data={agents}
      keyExtractor={(item) => item.uuid}
      numColumns={numColumns} 
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Animated.View
          entering={FadeIn.duration(500)} 
          style={[styles.agentCard, { width: cardSize, height: cardSize }]}
        >
          <Image source={{ uri: item.displayIcon }} style={styles.agentImage} />
          <ThemedText type="defaultSemiBold" style={styles.agentName}>
            {item.displayName}
          </ThemedText>
        </Animated.View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
    backgroundColor: '#0F1923', // Valorant black theme
  },
  agentCard: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#FF4655', // Valorant red theme
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  agentImage: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 8,
  },
  agentName: {
    color: '#FFFFFF', 
    textAlign: 'center',
    fontSize: 12,
  },
});
