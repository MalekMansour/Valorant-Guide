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

// Define the type for a gun
interface Gun {
  uuid: string;
  displayName: string;
  displayIcon: string;
  category: string;
  weaponStats: {
    fireRate: number;
    magazineSize: number;
    reloadTimeSeconds: number;
  } | null;
}

export default function GunsScreen() {
  const [guns, setGuns] = useState<Gun[]>([]);
  const [selectedGun, setSelectedGun] = useState<Gun | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch Guns data from Valorant API
    fetch('https://valorant-api.com/v1/weapons')
      .then((res) => res.json())
      .then((data) => setGuns(data.data))
      .catch((err) => console.error(err));
  }, []);

  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / numColumns - 16;

  const handleGunPress = (gun: Gun) => {
    setSelectedGun(gun);
    setIsModalVisible(true);
  };

  return (
    <>
      <FlatList
        data={guns}
        keyExtractor={(item) => item.uuid}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleGunPress(item)}>
            <Animated.View
              entering={FadeIn.duration(500)}
              style={[styles.gunCard, { width: cardWidth }]}
            >
              <Image
                source={{ uri: item.displayIcon }}
                style={styles.gunImage}
              />
              <ThemedText type="defaultSemiBold" style={styles.gunName}>
                {item.displayName}
              </ThemedText>
            </Animated.View>
          </Pressable>
        )}
      />

      {selectedGun && (
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
                  source={{ uri: selectedGun.displayIcon }}
                  style={styles.modalImage}
                />
                <ThemedText style={styles.gunNameLarge} type="title">
                  {selectedGun.displayName}
                </ThemedText>
                <ThemedText style={styles.category}>
                  {selectedGun.category}
                </ThemedText>
                {selectedGun.weaponStats && (
                  <>
                    <ThemedText style={styles.statsHeader} type="subtitle">
                      Stats:
                    </ThemedText>
                    <View style={styles.stats}>
                      <ThemedText style={styles.statItem}>
                        Fire Rate: {selectedGun.weaponStats.fireRate}
                      </ThemedText>
                      <ThemedText style={styles.statItem}>
                        Magazine Size: {selectedGun.weaponStats.magazineSize}
                      </ThemedText>
                      <ThemedText style={styles.statItem}>
                        Reload Time: {selectedGun.weaponStats.reloadTimeSeconds}{' '}
                        s
                      </ThemedText>
                    </View>
                  </>
                )}
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
    backgroundColor: '#0F1923',
  },
  gunCard: {
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
  gunImage: {
    width: '90%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  gunName: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
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
  gunNameLarge: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  category: {
    color: '#FF4655',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  statsHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  stats: {
    marginBottom: 16,
  },
  statItem: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
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
