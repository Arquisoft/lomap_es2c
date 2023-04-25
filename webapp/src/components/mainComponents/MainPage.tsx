import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { LeftWindow } from '../windowComponents/LeftWindow'
import { MapComponent } from 'components/windowComponents/map/MapComponent';
import { useParams } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';

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
            {console.log(mainop + "-" + op)}
            {(mainop === "groups" || mainop === "friends")
                && (op === "addplace" || op === "addgroup"
                    || op === "requests" || op === "showplace"
                    || op === "main" || op === "showgroup")
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
