import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { getLocation } from "../../redux/actions/Actions";
import { useSelector } from "react-redux";
import ButtonReport from "../components/ButtonReport";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const Map = ({ navigation }) => {
  const item = useSelector((state) => state);
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    const ref = collection(db, "location");
    onSnapshot(ref, (location) =>
      setMarker(
        location.docs.map((item) => ({
          data: item.data(),
        }))
      )
    );
    return () => {};
  }, []);

  const dispatch = useDispatch();
  const [location, setLocation] = useState({
    latitude: 15.275306145956984,
    longitude: 73.98186083883047,
    latitudeDelta: 0.004,
    longitudeDelta: 0.0005,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation({
        latitude: location.coords.latitude ? location.coords.latitude : 0,
        longitude: location.coords.longitude ? location.coords.longitude : 0,
      });
    })();
  }, []);

  const handleClick = async () => {
    // console.log(location);
    await dispatch(getLocation(location));
    console.log(item.latitude, item.longitude);
    navigation.navigate("Camera");
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          zIndex: 999,
          position: "absolute", //use absolute position to show button on top of the map
          top: "50%", //for center align
        }}
      >
        <ButtonReport
          title=""
          icon="report"
          onPress={handleClick}
          color="black"
        />
      </View>

      <MapView
        style={{
          flex: 1,
          // zIndex: -1,
        }}
        showsUserLocation={true}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }}
        onUserLocationChange={(e) => {
          setLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        zoomEnabled={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={location}
          draggable={true}
          onDragStart={(e) => {
            console.log(e.nativeEvent);
          }}
          onDragEnd={(e) => {
            console.log(e.nativeEvent);
            setLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        ></Marker>

        {marker.map((val) => (
          <Marker
            coordinate={{
              latitude: val.data.Location.latitude
                ? val.data.Location.latitude
                : 0,
              longitude: val.data.Location.longitude
                ? val.data.Location.longitude
                : 0,
            }}
            title="Test Title"
            description="This is the test description"
            pinColor={"blue"}
          >
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>PoPo Here</Text>
                  {/* <Text>A short description</Text> */}
                  <Svg width={240} height={120}>
                    <ImageSvg
                      width={"100%"}
                      height={300}
                      preserveAspectRatio="xMidYMid slice"
                      href={{ uri: val.data.Picture }}
                    />
                  </Svg>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: "100%",
  },
});
