import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=64419";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    // Turn on the loading indicator each time
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        // console.log("responseData");
        const myBus = responseData.services.filter(
          (item) => item.no === "112"
        )[0];
        setArrival(myBus.next.time);
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 3000);

    // Return the function to run when unmounting
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivaltime}>
        {loading ? <ActivityIndicator size="large" color="white" /> : arrival}
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
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
    color: "white",
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
