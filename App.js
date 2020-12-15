import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=64419";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [busNumber, setBusNumber] = useState("");
  const [arrival, setArrival] = useState("");
  const [nextarrival, setNextarrival] = useState("");
  const [duration, setDuration] = useState("");

  function dateConvert(time) {
    const day = new Date(time);
    let [hour, minute, second] = day.toLocaleTimeString("en-US").split(":");
    const timeArranged = `${hour}:${minute}:${second}`;
    return timeArranged;
  }

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
        setBusNumber(myBus.no);
        setArrival(dateConvert(myBus.next.time));
        setDuration(Math.round(myBus.next.duration_ms / 60000));
        setNextarrival(dateConvert(myBus.next2.time));
        setLoading(false);
      });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData, 5000);
    loadBusStopData(); // need to call it once right at the start w/o waiting

    // Return the function to run when unmounting
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Stop:</Text>
      <Text style={styles.nextarrivaltime}>64419</Text>

      <Text style={styles.title}>Bus Number:</Text>
      <Text style={styles.bus}>
        {loading ? <ActivityIndicator size="large" color="white" /> : busNumber}
      </Text>

      <Text style={styles.title}>Arrival time:</Text>
      {duration <= 5 ? (
        <Text style={styles.arrivaltime}>
          {loading ? <ActivityIndicator size="large" color="white" /> : arrival}{" "}
          (Arriving)
        </Text>
      ) : (
        <Text style={styles.arrivaltimenear}>
          {loading ? <ActivityIndicator size="large" color="white" /> : arrival}
        </Text>
      )}

      <Text style={styles.title}>Duration:</Text>
      {duration <= 5 ? (
        <Text style={styles.arrivaltime}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            duration
          )}
        </Text>
      ) : (
        <Text style={styles.arrivaltimenear}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            duration
          )}
        </Text>
      )}

      <Text style={styles.title}>Next arrival time:</Text>
      <Text style={styles.nextarrivaltime}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          nextarrival
        )}
      </Text>

      <TouchableOpacity style={styles.refreshbutton}>
        <Ionicons name="refresh-circle" size={70} color="black" />
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
    fontSize: 28,
    marginBottom: 6,
    color: "grey",
  },
  bus: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
    marginBottom: 28,
  },
  arrivaltime: {
    fontSize: 30,
    marginBottom: 28,
    color: "red",
  },
  arrivaltimenear: {
    fontSize: 30,
    marginBottom: 28,
    color: "green",
  },
  nextarrivaltime: {
    fontSize: 30,
    marginBottom: 28,
    color: "white",
  },
  refreshbutton: {
    backgroundColor: "violet",
    padding: 5,
  },
});
