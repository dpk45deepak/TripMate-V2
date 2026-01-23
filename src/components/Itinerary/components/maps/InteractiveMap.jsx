// src/components/maps/InteractiveMap.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = ({
    center = [51.505, -0.09],
    zoom = 10,
    markers = [],
    routes = [],
    showControls = true,
    onMarkerClick,
    className = ""
}) => {
    const mapRef = useRef(null);
    const [userLocation, setUserLocation] = useState(center);
    const [mapZoom, setMapZoom] = useState(zoom);

    useEffect(() => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(loc);
                    if (mapRef.current) {
                        mapRef.current.setView(loc, 13);
                    }
                },
                (error) => console.log('Error getting location:', error)
            );
        }
    }, []);

    const customIcon = (color = '#3b82f6') => new L.Icon({
        iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="45" viewBox="0 0 24 24" fill="${encodeURIComponent(color)}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        popupAnchor: [0, -45]
    });

    const userIcon = new L.Icon({
        iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%233b82f6"><circle cx="12" cy="12" r="10"/></svg>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });

    return (
        <div className={`relative rounded-2xl overflow-hidden ${className}`}>
            <MapContainer
                center={userLocation}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%', minHeight: '400px' }}
                ref={mapRef}
                className="rounded-2xl"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* User Location */}
                <Marker position={userLocation} icon={userIcon}>
                    <Popup>Your Location</Popup>
                </Marker>

                {/* Custom Markers */}
                {markers.map((marker, idx) => (
                    <Marker
                        key={idx}
                        position={marker.position}
                        icon={customIcon(marker.color)}
                        eventHandlers={{
                            click: () => onMarkerClick?.(marker)
                        }}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-gray-900">{marker.title}</h3>
                                <p className="text-gray-600 text-sm">{marker.description}</p>
                                {marker.cost && (
                                    <p className="text-green-600 font-medium mt-1">${marker.cost}</p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Routes */}
                {routes.map((route, idx) => (
                    <Polyline
                        key={idx}
                        positions={route.positions}
                        color={route.color || '#3b82f6'}
                        weight={3}
                        opacity={0.7}
                    />
                ))}
            </MapContainer>

            {/* Map Controls */}
            {showControls && (
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button
                        onClick={() => mapRef.current?.flyTo(userLocation, 13)}
                        className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        title="Go to my location"
                    >
                        <Navigation className="h-5 w-5 text-blue-500" />
                    </button>
                    <button
                        onClick={() => {
                            mapRef.current?.zoomIn();
                            setMapZoom(mapRef.current?.getZoom());
                        }}
                        className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        title="Zoom in"
                    >
                        <ZoomIn className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                        onClick={() => {
                            mapRef.current?.zoomOut();
                            setMapZoom(mapRef.current?.getZoom());
                        }}
                        className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                        title="Zoom out"
                    >
                        <ZoomOut className="h-5 w-5 text-gray-700" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default InteractiveMap;