// components/MapComponent.js
'use client'; // از این برای اجرای سمت کلاینت استفاده کنید

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// تنظیمات برای آیکون Marker (چون آیکون پیش‌فرض کار نمی‌کند)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/contact-us/marker.png',
  iconUrl: '/images/contact-us/marker.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize:[70,71]
});

const MapComponent = () => {
  return (
    <MapContainer center={[35.6892, 51.3890]} zoom={16} style={{ height: '500px', width: '100%' , marginTop: '50px' , filter: 'grayscale(84%)'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={[35.6892, 51.3890]}>
        <Popup>
          Tehran, Iran
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
