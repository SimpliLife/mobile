import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const { GOOGLE_PROJECT_ID, GOOGLE_API_KEY } = {
  GOOGLE_API_KEY: 'AIzaSyB6sUuookD3daNKD7cd1Sm2d9_SjPx7REc',
  GOOGLE_PROJECT_ID: 'developer-ayusudi'
}

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -6.217691,
  lng: 106.92424
};


function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: GOOGLE_PROJECT_ID,
    googleMapsApiKey: GOOGLE_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)