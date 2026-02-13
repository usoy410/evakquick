import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraRef, MapView, PointAnnotation } from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";
import { useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Map() {
  const cameraRef = useRef<CameraRef>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const getCurrentLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is required to center the map on your position.");
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);

      // Center map on current location
      if (cameraRef.current) {
        cameraRef.current.setCamera({
          centerCoordinate: [
            currentLocation.coords.longitude,
            currentLocation.coords.latitude,
          ],
          zoomLevel: 15,
          animationDuration: 1000, // Smooth animation over 1 second
        });
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Unable to get your current location. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
      >
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [123.2700, 13.6475], // [longitude, latitude] - Default to Tacloban City
            zoomLevel: 15,
          }}
        />

        {/* User location marker */}
        {location && (
          <PointAnnotation
            id="user-location"
            coordinate={[location.coords.longitude, location.coords.latitude]}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerInner}>
                <Ionicons name="navigate" size={24} color="white" />
              </View>
            </View>
          </PointAnnotation>
        )}
      </MapView>

      {/* Focus button - positioned outside MapView to ensure visibility */}
      <TouchableOpacity
        style={styles.focusButton}
        onPress={getCurrentLocation}
        activeOpacity={0.7}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  focusButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    zIndex: 1000, // Ensure button is on top of all other map elements
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
