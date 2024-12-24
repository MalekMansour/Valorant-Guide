import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define the type for a map item
interface Map {
  uuid: string;
  displayName: string;
  splash: string | null; // Splash can sometimes be null
  coordinates: string | null; // Example additional info
}

// Maps: Ascent, Icebox, Pearl
export default function MapsScreen() {
  const [maps, setMaps] = useState<Map[]>([]);

  useEffect(() => {
    fetch('https://valorant-api.com/v1/maps')
      .then((response) => response.json())
      .then((data) => setMaps(data.data))
      .catch((error) => console.error('Error fetching maps:', error));
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <FlatList
      data={maps}
      keyExtractor={(item) => item.uuid}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <ThemedView style={[styles.card, { width: screenWidth - 32 }]}>
          {item.splash ? (
            <Image source={{ uri: item.splash }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <ThemedText type="defaultBold" style={styles.placeholderText}>
                No Image Available
              </ThemedText>
            </View>
          )}
          <ThemedText type="title" style={styles.mapName}>
            {item.displayName}
          </ThemedText>
          {item.coordinates && (
            <ThemedText type="default" style={styles.mapDescription}>
              Coordinates: {item.coordinates}
            </ThemedText>
          )}
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1D3D47',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  placeholder: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#2A2E37',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#FFF',
    fontSize: 16,
  },
  mapName: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mapDescription: {
    fontSize: 14,
    color: '#C9D1D9',
    textAlign: 'center',
  },
});
