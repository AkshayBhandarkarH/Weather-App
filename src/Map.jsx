import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import icon from "./assets/red.svg";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 12.97602726969219,
  lng: 77.56500309061616,
};
const zoom = 12;
const mapOptions = {
  disableDefaultUI: false,
};

function Gmap({ lat, lng, handleSearch }) {
  const [coordinates, setCoordinates] = useState({ lat, lng });

  useEffect(() => {
    setCoordinates({ lat, lng });
    setTimeout(() => {
      console.log(coordinates);
    }, 500);
  }, [lat, lng]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDMlVAALBCx-2tliIzQKST8qFwIyCvIRc4",
  });

  if (loadError) {
    return <div>Error loading map</div>;
  }

  const handleMapClick = (event) => {
    const newLat = Number(event.latLng.lat());
    const newLng = Number(event.latLng.lng());

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: newLat, lng: newLng } }, (results, status) => {
      if (status === "OK" && results[0] && typeof handleSearch === "function") {
        console.log(results[0].formatted_address); // Corrected the console log for results
        handleSearch(results[0].formatted_address); // Pass the formatted address to handleSearch
      }
    });

    setCoordinates({ lat: newLat, lng: newLng });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates.lat ? coordinates : center}
      zoom={zoom}
      options={mapOptions}
      onClick={handleMapClick}
    >
      {coordinates.lat && coordinates.lng && <Marker position={coordinates} />}
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
}

export default Gmap;
