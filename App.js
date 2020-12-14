import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(true);
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=64419"

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
      });
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivaltime}>
        {loading ? <ActivityIndicator size="large" color="black" /> : "Loaded"}
      </Text>
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 24,
    color: "grey",
  },
  arrivaltime: {
    fontSize: 60,
    marginBottom: 32,
    backgroundColor: "grey",
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10,
  },
  refreshbutton: {
    backgroundColor: "violet",
    padding: 20,
  },
  buttontext: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
});
