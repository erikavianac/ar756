'use client';

import { MapContainer, TileLayer, Marker, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Icon, icon } from 'leaflet';

function MapComponent() {
  const customIcon = new Icon({
    iconUrl:
      'https://res.cloudinary.com/dzwboczzd/image/upload/v1727106821/1000_F_280874872_tVNxGcKAMB3s1rVuNtcB8MeloTb0PV28_zcesrq.jpg',
    iconSize: [100, 100],
    attribution: 'sdsd',
  });

  return (
    <div 
      className="leaflet-container h-[200px] w-full overflow-hidden z-40"
      role="application"
      aria-label="Mapa da localização AR756"
      tabIndex={0}
    >
      <MapContainer
        center={[-23.5876692, -46.5592499]}
        zoom={14}
        className="h-[200px]"
        dragging={false}
        aria-describedby="map-description"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/" aria-label="Link para OpenStreetMap">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="relative">
          <Marker
            position={[-23.5876692, -46.5592499]}
            alt="AR756"
            title="AR756"
            icon={customIcon}
            aria-label="Marcador da localização AR756"
          >
            <Popup>
              <h1 
                className="font-semibold text-gray-700"
                role="heading"
                aria-level={1}
              >
                O local exato sera indicado depois da reserva.
              </h1>
            </Popup>
          </Marker>
        </div>
      </MapContainer>
      <p 
        id="map-description" 
        className="sr-only"
      >
        Mapa mostrando a localização aproximada do espaço AR756. O endereço exato será fornecido após a confirmação da reserva.
      </p>
    </div>
  );
}

export default MapComponent;
