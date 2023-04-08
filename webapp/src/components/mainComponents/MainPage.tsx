import React from 'react'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'
import { MapComponent } from '../windowComponents/map/MapComponent';
import { useSelector } from 'react-redux';
import { RootState } from 'utils/redux/store';

const MapContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100vw',
    minHeight: '74.5vh',
    justifyContent: 'space-between'

})

export function MainPage() {
    const markers = useSelector((state: RootState) => state.markers.markers);
    
    return (
        <MapContainer disableGutters>
            <LeftWindow markers={markers}/>
            <MapComponent markers={markers} />
        </MapContainer>
    )
}
