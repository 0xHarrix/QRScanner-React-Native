import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function QRScannerScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [isFocused]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);

    // Store the scanned QR code in AsyncStorage
    try {
      const existingHistory = await AsyncStorage.getItem('qrCodeHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.push(data);
      await AsyncStorage.setItem('qrCodeHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error storing QR code history:', error);
    }
  };

  const openLink = (link) => {
    Linking.openURL(link)
      .catch((err) => console.error('Error opening link:', err));
  };

  const resetScannedLink = () => {
    setScannedData(null);
    setScanned(false);
  }

  return (
    <View
      key={isFocused ? 'focused' : 'unfocused'}
      style={styles.container}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />

      {scannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned Link:</Text>
          <Button
            title="Open Link"
            onPress={() => openLink(scannedData)}
            color="#4CAF50" // Modern green color
          />
          <View style={styles.buttonSpacing} />
          <Button
            title="Scan Again"
            onPress={() => resetScannedLink()}
            color="#FF5722" // Modern red color
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4', // Modern light gray background
  },
  scanner: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333', // Modern text color
  },
  buttonSpacing: {
    marginVertical: 10,
  },
});

export default QRScannerScreen;
