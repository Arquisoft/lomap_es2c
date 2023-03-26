import {useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';

const MapBox = styled(Box)({
  minWidth: "75vw",
  backgroundColor: "brown"
})

const center = {
  lat: 50.8504500,
  lng: 4.3487800
}



type MarkerData = {
  position: [number, number];
  name: string;
};

const markers: MarkerData[] = [
  { position: [50.90, 4.4], name: 'M1' },
  { position: [51, 4], name: 'M2' },
  { position: [50.7, 4.4], name: 'M3' },
];



function AddPlace(): any {
  const [marker, setMarker] = useState(null)
  const map = useMap()

  const m = useMapEvents({
    click(e) {
      if (marker !== null) {
        marker.remove();
      }

      var newMarker: L.Marker = L.marker(e.latlng);

      newMarker.bindPopup((new L.Popup({ keepInView: true })).setContent('<button id="addPlaceDyn">Añadir lugar</button>'))
      setMarker(newMarker)
      console.log(marker)

    }
  })

  if (marker !== null) {
    marker.addTo(map)
  }

  return null;
}



export const MapComponent = () => {

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map(({ position, name }) => (
        <Marker position={position} key={name}>
          <Popup>{name}</Popup>
        </Marker>
      ))}
      <AddPlace />
    </MapContainer>

  );

};


