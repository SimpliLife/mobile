import React, { useContext, useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MainContext from '../context/MainContext';

const { GOOGLE_PROJECT_ID, GOOGLE_API_KEY } = {
  GOOGLE_API_KEY: '',
  GOOGLE_PROJECT_ID: 'developer-ayusuadi'
}

const containerStyle = {
  width: '400px',
  height: '400px'
};

function MyComponent({ data: dataFaskes }) {
  const { isLoaded } = useJsApiLoader({
    id: GOOGLE_PROJECT_ID,
    googleMapsApiKey: GOOGLE_API_KEY
  })
  const { data } = useContext(MainContext)
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({
      lat: data.latitude,
      lng: data.longitude
    });
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: data.latitude,
        lng: data.longitude
      }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap >
  ) : <></>
}

export default React.memo(MyComponent)