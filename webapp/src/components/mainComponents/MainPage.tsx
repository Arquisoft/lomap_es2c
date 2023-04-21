import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'
import { MapComponent } from 'components/windowComponents/map/MapComponent';
import { Route, Routes, useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { useSession } from '@inrupt/solid-ui-react';
import { NoFound } from 'views/NoFound';

const MapContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100vw',
    minHeight: '74.5vh',
    justifyContent: 'space-between'

})

export function MainPage() {

    const { mainop, op } = useParams()

    return (
        <>
            {mainop == "groups" || mainop == "friends"
                || op == "addplace" || op == "addgroup"
                || op == "requests" || op == "showplace"
                || op == "main"
                ?
                <MapContainer disableGutters>
                    <LeftWindow />
                    <MapComponent />
                </MapContainer>
                :
                <ErrorPage />
            }

        </>
    )
}
