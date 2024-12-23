import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define the type for a map item
interface Map {
  uuid: string;
  displayName: string;
  splash: string;
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

  return (
    <FlatList
      data={maps}
      keyExtractor={(item) => item.uuid}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <ThemedView style={styles.card}>
          <Image source={{ uri: item.splash }} style={styles.image} />
          <ThemedText type="title">{item.displayName}</ThemedText>
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#1D3D47',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 8,
  },
});
