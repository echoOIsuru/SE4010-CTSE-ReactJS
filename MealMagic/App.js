import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { SplashScreen } from 'expo';
import { Asset } from 'expo-asset';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <AppNavigator />
  );
}
