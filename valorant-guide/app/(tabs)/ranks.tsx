import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Animated, { FadeIn } from 'react-native-reanimated';

// Define the type for a rank
interface Rank {
  uuid: string;
  displayName: string;
  displayIcon: string;
}

export default function RankScreen() {
  const [ranks, setRanks] = useState<Rank[]>([]);

  useEffect(() => {
    // Fetch ranks from Valorant API
    fetch('https://valorant-api.com/v1/competitivetiers')
      .then((res) => res.json())
      .then((data) => {
        const tiers = data.data.filter(
          (tier: any) => tier.tierName !== 'Unused'
        );
        setRanks(tiers);
      })
      .catch((err) => console.error(err));
  }, []);

  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / numColumns - 16;

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={ranks}
        keyExtractor={(item) => item.uuid}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn.duration(500)}
            style={[styles.rankCard, { width: cardWidth }]}
          >
            <Image source={{ uri: item.displayIcon }} style={styles.rankImage} />
            <ThemedText type="defaultSemiBold" style={styles.rankName}>
              {item.displayName}
            </ThemedText>
          </Animated.View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1923',
  },
  listContainer: {
    padding: 8,
  },
  rankCard: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#FF4655',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  rankImage: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  rankName: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
});
