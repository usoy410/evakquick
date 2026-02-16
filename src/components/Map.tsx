import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraRef, MapView, PointAnnotation } from "@maplibre/maplibre-react-native";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Map() {
  const cameraRef = useRef<CameraRef>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get initial location when map loads
    const getInitialLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setLocation(currentLocation);
        }
      } catch (error) {
        console.error("Error getting initial location:", error);
      }
    };

    getInitialLocation();
  }, []);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        const errorMessage = "Location access is required to center the map on your position.";
        setLocationError(errorMessage);
        Alert.alert("Permission Denied", errorMessage);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);

      if (cameraRef.current) {
        cameraRef.current.setCamera({
          centerCoordinate: [
            currentLocation.coords.longitude,
            currentLocation.coords.latitude,
          ],
          zoomLevel: 15,
          animationDuration: 1000,
        });
      }
    } catch (error) {
      const errorMessage = "Unable to get your current location. Please try again.";
      setLocationError(errorMessage);
      console.error("Error getting location:", error);
      Alert.alert("Error", errorMessage);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} mapStyle="https://tiles.openfreemap.org/styles/positron">
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [123.2700, 13.6475], // Tacloban City
            zoomLevel: 15,
          }}
        />

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

      <TouchableOpacity
        style={styles.focusButton}
        onPress={getCurrentLocation}
        activeOpacity={0.7}
        disabled={isLoadingLocation}
      >
        {isLoadingLocation ? (
          <Ionicons name="hourglass-outline" size={24} color="white" />
        ) : (
          <Ionicons name="locate" size={24} color="white" />
        )}
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
    zIndex: 1000,
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
