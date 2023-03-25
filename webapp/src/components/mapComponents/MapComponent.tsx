import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { AddPlace } from './AddPlaceComponent';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const MapBox = styled(Box)({
    minWidth: "75vw",
    backgroundColor: "brown"
})

export const MapComponent = () => {

    const [url, setUrl] = useState("../add-point.png");

    var addIcon = L.icon({
        iconUrl: url,
    
        iconSize:     [38, 55], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    function onMapClick(e:any) {
        // AddPlaceComponent("prueba", "porfa", null)
         addd(e.latlng[0], e.latlng[1])
         //alert("You clicked the map at " + e.latlng);
     }
 
     
     function Prueba():any {
         const map = useMap()
         map.on('click', onMapClick);
         
         return null
   }
 
   function addd(long:number, lat:number):any {
     return <Marker position={[lat,long]} icon={addIcon}>
                  <Popup keepInView={true}>
                 <button>añadir lugar</button>
                  </Popup>
              </Marker>
 }
 
 
   function Markers():any {
        return <Marker position={[50.8504500, 4.3487800]} icon={addIcon}>
                     <Popup keepInView={true}>
                    <button>añadir lugar</button>
                     </Popup>
                 </Marker>
   }

    const mapRef = useRef<L.Map>(null);
  
    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.setView([51.505, -0.09], 13);
      }
    }, []);
  
    return (
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100vh', width: '100vw' }}
        whenCreated={(map:any) => {
           mapRef.current = map;
        }}
      >
       <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
  };
  

