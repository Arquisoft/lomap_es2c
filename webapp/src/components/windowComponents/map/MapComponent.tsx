import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'utils/redux/store';
import { addPlaceMarker } from 'utils/redux/action';
import React from 'react';

const BrusselsCenter = {
    lat: 50.8504500,
    lng: 4.3487800
}

function markerIcon(url: string): L.Icon {
    return new L.Icon({
        iconUrl: url,
        iconSize: [41, 41]
    })
};

const addMarkerIcon = new L.Icon({
    iconUrl: '../markers/add-location.png',
    iconSize: [47, 47]
});


function CenterMap(): any {
    const map = useMap();

    useEffect(() => {
        map.locate({ setView: true });

        function onLocationFound(e: any) {
            map.flyTo(e.latlng, map.getZoom());
        }

        map.on("locationfound", onLocationFound);

        return () => {
            map.off("locationfound", onLocationFound);
        };
    }, [map]);

    return null;
}

function CenterMapOnMarker(props: { marker: any }): any {
    const map = useMap();
    if (props.marker != null) {
        let position = props.marker.position;
        map.flyTo(position, map.getZoom());
    }

    return null;
}


function RestrictMapMovement(): any {
    const map = useMap();

    const maxBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

    map.setMaxBounds(maxBounds);

    map.on('drag', function () {
        map.panInsideBounds(maxBounds, { animate: false });
    });

    return null;
}


function AddPlace(props: any): any {

    const [marker, setMarker] = useState(new L.Marker(BrusselsCenter))
    let lat = "0";
    let lng = "0";
    const navigate = useNavigate()
    const map = useMap()
    const { op, id } = useParams()
    const dispatch = useDispatch();


    let nMarker: L.Marker = null;

    useMapEvents({
        click(e) {
            dispatch(addPlaceMarker(true))
            if (op === 'addplace') {
                lat = e.latlng.lat.toString();
                lng = e.latlng.lng.toString();
                if (marker !== null) {
                    marker.remove();
                }
                if (lat !== "0") {
                    nMarker = L.marker(e.latlng);
                    nMarker.setIcon(addMarkerIcon);
                    nMarker.bindPopup((new L.Popup({ keepInView: true })).setContent("<p>Lugar a añadir</p>"))
                    nMarker.addTo(map)
                    setMarker(nMarker)
                    navigate("/home/groups/addplace/" + id + "/" + lat + "/" + lng + "/")
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

    const myMarkers = useSelector((state: RootState) => state.markers.markers);
    const friendMarkers = useSelector((state: RootState) => state.markers.friendsMarkers);
    const markers = myMarkers.concat(friendMarkers);

    const showAdd = useSelector((state: RootState) => state.markers.addPlaceMarker);

    const groupid = useSelector((state: RootState) => state.markers.groupName);

    const friendUsername = useSelector((state: RootState) => state.markers.friendUsername);
    const friendGroupId = useSelector((state: RootState) => state.markers.friendGroupName);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMarkerClick = (marker: any) => {
        dispatch(addPlaceMarker(false))
        let url = `/home/groups/showplace/${groupid}${marker.name ? `/${marker.name}` : ''}`;
        console.log(marker.type)
        console.log(friendGroupId)
        if (marker.type == "friend") {
            url = `/home/friends/showplace/${friendUsername}/${friendGroupId}${marker.name ? `/${marker.name}` : ''}`;
        }
        navigate(url);
    };

    const [centerMarker, setCenterMarker] = useState(null);

    useEffect(() => {
        if (markers.length > 0) {
            setCenterMarker(markers[0]);
        }
    }, [markers]);

    const CenterMapOnMarkerMemo = React.useMemo(() => React.memo(CenterMapOnMarker), [centerMarker]);

    return (
        <MapContainer center={BrusselsCenter} zoom={15} scrollWheelZoom={true} minZoom={3} maxZoom={18} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RestrictMapMovement />
            {centerMarker == null && <CenterMap />}
            {markers.map((marker) => (
                <Marker position={marker.position} key={marker.name} icon={markerIcon(marker.iconUrl)} eventHandlers={{ click: () => handleMarkerClick(marker) }}>
                    <Popup>{marker.name}</Popup>
                </Marker>
            ))}
            {centerMarker && <CenterMapOnMarkerMemo marker={centerMarker} />}
            <AddPlace showAdd={showAdd} />
        </MapContainer>
    );

};


