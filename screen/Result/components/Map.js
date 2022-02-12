import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

const Map = ({ locationHistory }) => {
  return (
    <MapView
      initialRegion={{
        latitude: locationHistory[0].latitude,
        longitude: locationHistory[0].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
    >
      <Polyline
        coordinates={locationHistory}
        strokeColor="#000"
        strokeWidth={3}
      />
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

Map.propTypes = {
  locationHistory: PropTypes.arrayOf(PropTypes.object),
};

Map.defaultProps = {
  locationHistory: [
    {
      latitude: 37.4219983,
      longitude: 127.084,
    },
  ],
};
