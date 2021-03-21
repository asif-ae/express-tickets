import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const MapDivision = () => {
  return (
    <>
      {/* The map container */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <div id="map">
        <MapContainer
          center={[ 23.81065, 90.41171 ]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/asiftushar/ckmhpynub35bd17oiavujm19a/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXNpZnR1c2hhciIsImEiOiJja21ob2swanUwNTc0MnBvNzdpaGlodWxoIn0.JLzTBTDXx7du465cImbCug"
            attribution="&copy; <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> &copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          />
          <Marker position={[ 23.81065, 90.41171 ]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default MapDivision;