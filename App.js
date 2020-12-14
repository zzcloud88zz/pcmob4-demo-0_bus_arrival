import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivaltime}>Loading...</Text>
      <TouchableOpacity style={styles.refreshbutton}>
        <Text style={styles.buttontext}>Refresh!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 24,
  },
  arrivaltime: {
    fontSize: 64,
    marginBottom: 32,
  },
  refreshbutton: {
    backgroundColor: "green",
    padding: 20,
  },
  buttontext: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
});
