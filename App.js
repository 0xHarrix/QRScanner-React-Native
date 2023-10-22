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
          activeTintColor: '#4CAF50',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'white',
            borderTopWidth: 0,
          },
          labelStyle: {
            fontSize: 12,
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
            title: 'Home',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 20,
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
            title: 'QR Scanner',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 20,
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
            title: 'QR Code History',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 20,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
