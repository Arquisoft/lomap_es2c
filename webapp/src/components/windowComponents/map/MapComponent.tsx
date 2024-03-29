import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'utils/redux/store';
import { addPlaceMarker, clearFriendsMarkers, clearMarkers } from 'utils/redux/action';
import React from 'react';
import PlaceCategories from '../places/PlaceCategories';

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
    iconUrl: 'add-location.png',
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
    if (props.marker !== null) {
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
        if (marker !== null) {
            marker.remove();
        }
    }

    return null;
}

function CleanMap(props: { myGroup: string, friendGroup: string }): any {
    const map = useMap();

    const dispatch = useDispatch();

    const hasCleanMap = document.getElementById("cleanMapButton");

    if (hasCleanMap === null) {
        let legend = new L.Control({ position: 'topright' });

        legend.onAdd = function () {
            let div = L.DomUtil.create('div', 'cleanMap');
            div.innerHTML += '<button id="cleanMapButton"><img width="20px" src="cleanMap.png" alt="Descripción de la imagen">Limpiar mapa</button>';
            return div;
        };

        legend.addTo(map);
    }
    if (hasCleanMap) {
        const hasOnClick = hasCleanMap.hasAttribute('name');
        if (!hasOnClick)
            hasCleanMap.addEventListener('click', () => {
                hasCleanMap.setAttribute('name', 'cleanMapName');
                dispatch(clearMarkers());
                dispatch(clearFriendsMarkers());
                dispatch(addPlaceMarker(false))
            })
    }
    return null;
}

function Legend(): any {
    const map = useMap();

    const hasLegend = document.getElementById("titutloleyenda");

    if (hasLegend === null) {
        let legend = new L.Control({ position: 'bottomleft' });

        legend.onAdd = function () {
            let div = L.DomUtil.create('div', 'Leyenda');
            div.innerHTML += '<h3 id="titutloleyenda" style="color: #81c784">Leyenda</h4>';
            div.innerHTML += '<img src="myMarker.png" width="20px">Tus lugares<br>';
            div.innerHTML += '<img src="friendsMarker.png" width="20px">Lugares de tus amigos<br>';
            div.innerHTML += '<img src="add-location.png" width="20px">Lugar que estás añadiendo<br>';
            return div;
        };

        legend.addTo(map);
    }

    return null;
}

export const MapComponent = () => {


    function filterPlaces(place: any, filters: string[]) {
        let checkPlace: boolean = false;
        if (place.category === undefined || place.category === null)
        {
           checkPlace = filters.includes("Otro");
        } else
        {
            const placeCategory = PlaceCategories.find((pc) => pc.categories.includes(place.category));
            checkPlace = filters.includes(placeCategory?.name);
        }
        return checkPlace;
    }

    const filterForMyMarkers = useSelector((state: RootState) => state.markers.myFilters);
    let myMarkers = useSelector((state: RootState) => state.markers.markers);
    if (filterForMyMarkers.length > 0)
        myMarkers = myMarkers.filter((place) => {
            return filterPlaces(place, filterForMyMarkers)
        });

    const filterForFriendsMarkers = useSelector((state: RootState) => state.markers.friendsFilters);
    let friendMarkers = useSelector((state: RootState) => state.markers.friendsMarkers);
    if (filterForFriendsMarkers.length > 0)
        friendMarkers = friendMarkers.filter((place) => {
            return filterPlaces(place, filterForFriendsMarkers)
        });

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

        if (marker.type === "friend") {
            url = `/home/friends/showplace/${friendUsername}/${friendGroupId}${marker.name ? `/${marker.name}` : ''}`;
        }
        navigate(url);


    };

    const [centerMarker, setCenterMarker] = useState(null);

    useEffect(() => {
        if (markers.length > 0) {
            setCenterMarker(markers[markers.length-1]);
        }
    }, [markers]);


    const CenterMapOnMarkerMemo = React.useMemo(() => React.memo(CenterMapOnMarker), []);



    return (
        <MapContainer center={BrusselsCenter} zoom={15} scrollWheelZoom={true} minZoom={3} maxZoom={18} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Legend />
            <RestrictMapMovement />
            {centerMarker === null && <CenterMap />}
            {markers.map((marker) => (
                <Marker position={marker.position} key={marker.name} icon={markerIcon(marker.iconUrl)} eventHandlers={{ click: () => handleMarkerClick(marker) }}>
                    <Popup><>
                        <h3 className='markerName'>{marker.name}</h3>
                        {marker.imageUrl !== undefined && marker.imageUrl.length > 0 && <img src={marker.imageUrl} width="100" height="100" id={marker.name} key={marker.name} alt={marker.name} crossOrigin="anonymous"/>}
                    </></Popup>
                </Marker>
            ))}
            {centerMarker && <CenterMapOnMarkerMemo marker={centerMarker} />}
            <AddPlace showAdd={showAdd} />
            <CleanMap myGroup={groupid} friendGroup={friendGroupId} />
        </MapContainer>
    );

};


