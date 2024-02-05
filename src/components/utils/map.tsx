'use client';

import { MapContainer, TileLayer, Marker, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Icon, icon } from 'leaflet';

function MapComponent() {
  const customIcon = new Icon({
    iconUrl:
      'https://res.cloudinary.com/dcjkvwbvh/image/upload/v1688637822/onbridge/onkggypchr1yoffmtyop.png',
    iconSize: [100, 100],
    attribution: 'sdsd',
  });

  return (
    <div className="leaflet-container h-[200px] w-full overflow-hidden z-40">
      <MapContainer
        center={[-23.5876692, -46.5592499]}
        zoom={14}
        className="h-[200px]"
        dragging={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="relative">
          <Marker
            position={[-23.5876692, -46.5592499]}
            alt="AR756"
            title="AR756"
            icon={customIcon}
          >
            <Popup>
              <h1 className="font-semibold text-gray-700">
                O local exato sera indicado depois da reserva.
              </h1>
            </Popup>
          </Marker>
        </div>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
