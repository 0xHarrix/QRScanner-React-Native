import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { useFocusEffect } from '@react-navigation/native';

function QRCodeHistoryScreen({ navigation }) {
  const [qrCodeHistory, setQRCodeHistory] = useState([]);

  const loadQRCodeHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('qrCodeHistory');
      if (history) {
        setQRCodeHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading QR code history:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadQRCodeHistory();
    }, [])
  );

  const handleHistoryItemPress = (item) => {
    navigation.navigate('QRCodeDetails', { qrCodeContent: item });
  };

  const handleClearHistory = async () => {
    try {
      await AsyncStorage.removeItem('qrCodeHistory');
      setQRCodeHistory([]);
    } catch (error) {
      console.error('Error clearing QR code history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Clear History"
        onPress={handleClearHistory}
        color="#FF5722" // Modern red color
      />
      <FlatList
        data={qrCodeHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleHistoryItemPress(item)}>
            <View style={styles.historyItem}>
              <QRCode value={item} size={60} />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Scanned QR Code Content:</Text>
                <Text style={styles.qrCodeText}>{item}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  qrCodeText: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
  },
});

export default QRCodeHistoryScreen;
