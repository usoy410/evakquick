import { MapView } from "@maplibre/maplibre-react-native";

export default function Map() {
  return (
    <MapView
      style={{ flex: 1 }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    />
  );
}
