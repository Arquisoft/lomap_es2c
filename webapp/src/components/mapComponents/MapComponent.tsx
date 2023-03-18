import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { useState } from 'react';
import L from 'leaflet';

const MapBox = styled(Box)({
    minWidth: "75vw",
    backgroundColor: "brown"
})


export const MapComponent = () => {

    function onMapClick(e:any) {
        alert("You clicked the map at " + e.latlng);
    }

    
    function Prueba():any {
        const map = useMap()
        map.on('click', onMapClick);
        console.log('map center:', map.getCenter())
        L.circle([51.508, -0.11], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
        return null
  }
    return (
        <MapBox>
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Prueba/>
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </MapBox>
    )
}
