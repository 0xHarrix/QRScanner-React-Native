import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import QRScannerScreen from './screen/QRScannerScreen';
import QRCodeHistoryScreen from './screen/QRCodeHistoryScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [qrCodeHistory, setQRCodeHistory] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#4CAF50', // Active tab color (green)
          inactiveTintColor: 'gray', // Inactive tab color
          style: {
            backgroundColor: 'white', // Background color of the tab bar
            borderTopWidth: 0, // Remove the default top border
          },
          labelStyle: {
            fontSize: 12, // Font size of tab labels
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            title: 'Home', // Set the header title for this screen
            headerStyle: {
              backgroundColor: '#4CAF50', // Header background color (green)
            },
            headerTintColor: 'white', // Header text color
            headerTitleStyle: {
              fontSize: 20, // Font size of the header title
            },
          }}
        />
        <Tab.Screen
          name="QRScanner"
          component={QRScannerScreen}
          initialParams={{ qrCodeHistory, setQRCodeHistory }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
            ),
            title: 'QR Scanner', // Set the header title for this screen
            headerStyle: {
              backgroundColor: '#4CAF50', // Header background color (green)
            },
            headerTintColor: 'white', // Header text color
            headerTitleStyle: {
              fontSize: 20, // Font size of the header title
            },
          }}
        />
        <Tab.Screen
          name="QRCodeHistory"
          component={QRCodeHistoryScreen}
          initialParams={{ qrCodeHistory }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="history" color={color} size={size} />
            ),
            title: 'QR Code History', // Set the header title for this screen
            headerStyle: {
              backgroundColor: '#4CAF50', // Header background color (green)
            },
            headerTintColor: 'white', // Header text color
            headerTitleStyle: {
              fontSize: 20, // Font size of the header title
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
