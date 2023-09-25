import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFonts, Abel_400Regular } from '@expo-google-fonts/abel';
import { HankenGrotesk_300Light } from '@expo-google-fonts/hanken-grotesk';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [reloadError, setReloadError] = useState<string | undefined>(undefined);
  const [fontsLoaded, error] = useFonts({
    Abel_400Regular,
    HankenGrotesk_300Light,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  const handleReload = () => {
    Updates.reloadAsync()
      .then(() => setReloadError(undefined))
      .catch((e) => setReloadError(e));
  };

  const textStyle = fontsLoaded ? [styles.text, { fontFamily: 'Abel_400Regular' }] : styles.text;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }} />
      {fontsLoaded ? (
        <Text style={textStyle}>Styling! :D Hooray!</Text>
      ) : (
        <Text style={textStyle}>{`Error: ${error}`}</Text>
      )}
      <Pressable onPress={handleReload} style={styles.button}>
        <Text style={styles.buttonText}>Reload</Text>
      </Pressable>
      <Text style={styles.text}>{`Reload error: ${reloadError ?? ''}`}</Text>
      <View style={{ flex: 1 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4630EB',
  },
  buttonText: {
    color: 'white',
  },
  text: {
    alignSelf: 'center',
  },
});
