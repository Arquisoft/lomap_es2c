import React, { useState } from 'react'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'
import { MapComponent } from '../mapComponents/MapComponent';

const MapContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100vw',
    minHeight: '74.5vh',
    justifyContent: 'space-between'

})

function CSSLeafletLink(){
    return  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
    crossOrigin=""/>;
}

function ScriptLeafletLink(){
    return <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
    crossOrigin=""></script>;
}

export function MapPage() {



    return (
        <MapContainer disableGutters>
            <CSSLeafletLink/>
            <ScriptLeafletLink/>
            <LeftWindow />
            <MapComponent />
        </MapContainer>
    )
}
