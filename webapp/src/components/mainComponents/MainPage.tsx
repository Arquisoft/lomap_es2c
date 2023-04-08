import React from 'react'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'
import { MapComponent } from '../windowComponents/map/MapComponent';
import { useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { Session } from '@inrupt/solid-client-authn-browser';

const MapContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100vw',
    minHeight: '74.5vh',
    justifyContent: 'space-between'

})

export function MainPage(props: { session: () => Session }) {

    const { mainop } = useParams()

    return (
        <>
            {mainop == "groups" || mainop == "friends" ?
                <MapContainer disableGutters>
                    <LeftWindow session={props.session} />
                    <MapComponent />
                </MapContainer>
                :
                <ErrorPage />
            }
        </>
    )
}
