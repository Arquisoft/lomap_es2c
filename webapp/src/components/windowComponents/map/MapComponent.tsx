import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'utils/redux/store';
import { addPlaceMarker } from 'utils/redux/action';

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


function AddPlace(props:any): any {

    const [marker, setMarker] = useState(new L.Marker(center))
    const [lat, setLatitude] = useState("Latitud:")
    const [lng, setLongitude] = useState("Longitud:")
    const navigate = useNavigate()
    const map = useMap()
    const { op, id } = useParams()
    const dispatch = useDispatch();


    let nMarker: L.Marker = null;

    useMapEvents({
        click(e) {
            dispatch(addPlaceMarker(true))
            if (op == 'addplace') {
                setLatitude(e.latlng.lat.toString());
                setLongitude(e.latlng.lng.toString());
                if (marker !== null) {
                    marker.remove();
                }
                if (lat !== "Latitud:") {
                    nMarker = L.marker(e.latlng);
                    nMarker.bindPopup((new L.Popup({ keepInView: true })).setContent("<p>Lugar a añadir</p>"))
                    nMarker.addTo(map)
                    navigate("/home/groups/addplace/" + id + "/" + lat + "/" + lng + "/")
                    setMarker(nMarker)
                    console.log(marker)
                }
            }
        }
    })

    if(!props.showAdd){
        if(marker !== null)
            marker.remove();
    }

    return null;
}

export const MapComponent = () => {

    const markers = useSelector((state: RootState) => state.markers.markers);

    const showAdd = useSelector((state: RootState) => state.markers.addPlaceMarker);

    const groupid = useSelector((state: RootState) => state.markers.groupName);

    console.log("en el mapa")
    console.log(markers[1].name)
    const navigate = useNavigate();

    const handleMarkerClick = (name: string) => {
        navigate(`/home/groups/showplace/${groupid}${name ? `/${name}` : ''}`);
      };


    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
                <Marker position={marker.position} key={marker.name} eventHandlers={{ click: () => handleMarkerClick(marker.name) }}>
                    <Popup>{marker.name}</Popup>
                </Marker>
            ))}
            <AddPlace showAdd={showAdd}/>
        </MapContainer>
    );

};


