import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { useNavigate, useParams } from 'react-router-dom';

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
  
  const [marker, setMarker] = useState(new L.Marker(center))
  const [lat, setLatitude] = useState("Latitud:")
  const [lng, setLongitude] = useState("Longitud:")
  const navigate = useNavigate()
  const map = useMap()
  const {op, id} = useParams()

  let nMarker: L.Marker = null;

  useMapEvents({
    click(e) {
      if(op == 'addplace'){
          setLatitude(e.latlng.lat.toString());
          setLongitude(e.latlng.lng.toString());
          if (marker !== null) {
            marker.remove();
          }
          if(lat!=="Latitud:"){
            nMarker = L.marker(e.latlng);
            nMarker.bindPopup((new L.Popup({ keepInView: true })).setContent("<p>Lugar a añadir</p>"))
            nMarker.addTo(map)    
            navigate("/home/groups/addplace/" + id + "/" + lat + "/" + lng + "/")
            setMarker(nMarker)
            console.log(marker)
        }
      }}
  })

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


