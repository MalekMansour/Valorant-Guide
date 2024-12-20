import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Animated, { FadeIn } from 'react-native-reanimated';

// Define the type for an agent
interface Agent {
  uuid: string;
  displayName: string;
  displayIcon: string;
  fullPortrait: string;
  description: string;
  abilities: {
    displayName: string;
    description: string;
    displayIcon: string;
  }[];
}

export default function AgentsScreen() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch Agents data from Valorant API
    fetch('https://valorant-api.com/v1/agents')
      .then((res) => res.json())
      .then((data) => setAgents(data.data))
      .catch((err) => console.error(err));
  }, []);

  const numColumns = 5;
  const screenWidth = Dimensions.get('window').width;
  const cardSize = screenWidth / numColumns - 16;

  const handleAgentPress = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalVisible(true);
  };

  return (
    <>
      <FlatList
        data={agents}
        keyExtractor={(item) => item.uuid}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleAgentPress(item)}>
            <Animated.View
              entering={FadeIn.duration(500)}
              style={[styles.agentCard, { width: cardSize, height: cardSize }]}
            >
              <Image
                source={{ uri: item.displayIcon }}
                style={styles.agentImage}
              />
              <ThemedText type="defaultSemiBold" style={styles.agentName}>
                {item.displayName}
              </ThemedText>
            </Animated.View>
          </Pressable>
        )}
      />

      {selectedAgent && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <ThemedView style={styles.modalContent}>
              <ScrollView>
                <Image
                  source={{ uri: selectedAgent.fullPortrait }}
                  style={styles.modalImage}
                />
                <ThemedText style={styles.agentNameLarge} type="title">
                  {selectedAgent.displayName}
                </ThemedText>
                <ThemedText style={styles.agentDescription}>
                  {selectedAgent.description}
                </ThemedText>
                <ThemedText style={styles.abilitiesHeader} type="subtitle">
                  Abilities:
                </ThemedText>
                {selectedAgent.abilities.map((ability, index) => (
                  <View key={index} style={styles.ability}>
                    {ability.displayIcon && (
                      <Image
                        source={{ uri: ability.displayIcon }}
                        style={styles.abilityIcon}
                      />
                    )}
                    <View>
                      <ThemedText style={styles.abilityName}>
                        {ability.displayName}
                      </ThemedText>
                      <ThemedText style={styles.abilityDescription}>
                        {ability.description}
                      </ThemedText>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <Pressable
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <ThemedText style={styles.closeButtonText}>Close</ThemedText>
              </Pressable>
            </ThemedView>
          </View>
        </Modal>
      )}
    </>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#0F1923',
  },
  modalImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  agentNameLarge: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  agentDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'justify',
  },
  abilitiesHeader: {
    color: '#FF4655',
    marginBottom: 8,
  },
  ability: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  abilityIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  abilityName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  abilityDescription: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FF4655',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
