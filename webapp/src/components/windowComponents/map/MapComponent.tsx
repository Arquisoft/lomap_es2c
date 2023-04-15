import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'utils/redux/store';
import { addPlaceMarker } from 'utils/redux/action';
import { MarkerData } from 'shared/shareddtypes';

const center = {
    lat: 50.8504500,
    lng: 4.3487800
}

function CenterMap():any {
    const map = useMap();
  
    useEffect(() => {
      map.locate({ setView: true, maxZoom: 13 });
  
      function onLocationFound(e:any) {
        map.flyTo(e.latlng, map.getZoom());
      }
  
      map.on("locationfound", onLocationFound);
  
      return () => {
        map.off("locationfound", onLocationFound);
      };
    }, [map]);
  
    return null;
  }

  function CenterMapOnMarker(props: { marker: any }):any {
    const map = useMap();
    if(props.marker != null){
        let position = props.marker.position;
        map.setView(position, map.getZoom());
    }
    
    return null;
  }
  
  
  
function AddPlace(props: any): any {

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

    if (!props.showAdd) {
        if (marker !== null)
            marker.remove();
    }

    return null;
}

export const MapComponent = () => {

    const markers = useSelector((state: RootState) => state.markers.markers);

    const showAdd = useSelector((state: RootState) => state.markers.addPlaceMarker);

    const groupid = useSelector((state: RootState) => state.markers.groupName);

    const navigate = useNavigate();

    const handleMarkerClick = (name: string) => {
        navigate(`/home/groups/showplace/${groupid}${name ? `/${name}` : ''}`);
    };

    const [centerMarker, setCenterMarker] = useState(null);

    useEffect(() => {
        if (markers.length > 0) {
            setCenterMarker(markers[0]);
        }
    }, [markers]);
    
    return (
        <MapContainer center={center} zoom={15} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {centerMarker == null && <CenterMap/>}
            {markers.map((marker) => (
                <Marker position={marker.position} key={marker.name} eventHandlers={{ click: () => handleMarkerClick(marker.name) }}>
                    <Popup>{marker.name}</Popup>
                </Marker>
            ))}
            {centerMarker != null && <CenterMapOnMarker marker={centerMarker} />}
            <AddPlace showAdd={showAdd} />
        </MapContainer>
    );

};


