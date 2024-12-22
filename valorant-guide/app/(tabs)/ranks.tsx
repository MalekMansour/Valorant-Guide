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

interface Rank {
  tier: number;
  tierName: string;
  largeIcon: string | null;
}

export default function RankScreen() {
  const [ranks, setRanks] = useState<Rank[]>([]);

  useEffect(() => {
    fetch('https://valorant-api.com/v1/competitivetiers')
      .then((res) => res.json())
      .then((data) => {
        console.log('API Data:', data); // Debugging API response
        const competitiveTiers = data.data[3]; // Adjust for the correct episode
        console.log('Competitive Tiers:', competitiveTiers);
        const tiers = competitiveTiers.tiers.filter(
          (tier: any) =>
            tier.tier !== undefined &&
            tier.tierName !== 'Unused' &&
            tier.tierName !== ''
        );
        console.log('Filtered Tiers:', tiers); // Debug filtered tiers
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
        keyExtractor={(item) =>
          item.tier ? item.tier.toString() : Math.random().toString()
        }
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Animated.View
            entering={FadeIn.duration(500)}
            style={[styles.rankCard, { width: cardWidth }]}
          >
            {item.largeIcon ? (
              <Image source={{ uri: item.largeIcon }} style={styles.rankImage} />
            ) : (
              <Text style={styles.placeholder}>No Icon</Text>
            )}
            <ThemedText type="defaultSemiBold" style={styles.rankName}>
              {item.tierName || 'Unknown Rank'}
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
  placeholder: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 16,
  },
});
