import { useEffect, useRef, useState } from 'react';
import { Popup } from '../types/popup';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  popups: Popup[];
  onMarkerClick: (popup: Popup) => void;
  center: [number, number];
  fullScreen?: boolean;
}

export function MapView({ popups, onMarkerClick, center, fullScreen = false }: MapViewProps) {
  const [map, setMap] = useState<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = await import('leaflet');
      
      // Fix default icon issue
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z" fill="#dc2626" stroke="#1a1a1a" stroke-width="2"/>
            <circle cx="12" cy="12" r="5" fill="white" stroke="#1a1a1a" stroke-width="1"/>
          </svg>
        `),
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
            <path d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24c0-6.6-5.4-12-12-12z" fill="#dc2626" stroke="#1a1a1a" stroke-width="2"/>
            <circle cx="12" cy="12" r="5" fill="white" stroke="#1a1a1a" stroke-width="1"/>
          </svg>
        `),
        shadowUrl: '',
        iconSize: [32, 48],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48],
      });

      // Create map instance
      const mapInstance = L.map(mapContainerRef.current, {
        center: center as [number, number],
        zoom: 13,
        scrollWheelZoom: true,
        zoomControl: true,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Add markers
      const bounds = L.latLngBounds([]);
      popups.forEach((popup) => {
        const marker = L.marker([popup.lat, popup.lng]).addTo(mapInstance);
        
        const popupContent = `
          <div style="padding: 8px; font-family: var(--font-primary);">
            <div style="font-family: var(--font-display); font-weight: 700; color: #1a1a1a; margin-bottom: 4px;">
              ${popup.name}
            </div>
            <div style="font-size: 14px; color: #6b5744; margin-bottom: 4px;">
              ${popup.cuisine}
            </div>
            <div style="font-size: 12px; color: #88a37e;">
              ${popup.attendees} attending
            </div>
          </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.on('click', () => onMarkerClick(popup));
        bounds.extend([popup.lat, popup.lng]);
      });

      // Fit bounds to show all markers
      if (popups.length > 0) {
        mapInstance.fitBounds(bounds, { padding: [50, 50] });
      }

      setMap(mapInstance);
    };

    initMap();

    // Cleanup
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Update markers when popups change
  useEffect(() => {
    if (!map) return;

    const L = require('leaflet');
    
    // Clear existing markers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    const bounds = L.latLngBounds([]);
    popups.forEach((popup) => {
      const marker = L.marker([popup.lat, popup.lng]).addTo(map);
      
      const popupContent = `
        <div style="padding: 8px; font-family: var(--font-primary);">
          <div style="font-family: var(--font-display); font-weight: 700; color: #1a1a1a; margin-bottom: 4px;">
            ${popup.name}
          </div>
          <div style="font-size: 14px; color: #6b5744; margin-bottom: 4px;">
            ${popup.cuisine}
          </div>
          <div style="font-size: 12px; color: #88a37e;">
            ${popup.attendees} attending
          </div>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      marker.on('click', () => onMarkerClick(popup));
      bounds.extend([popup.lat, popup.lng]);
    });

    if (popups.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [popups, map, onMarkerClick]);

  return (
    <div
      className={`w-full ${fullScreen ? 'h-full' : 'h-[400px]'} rounded-2xl overflow-hidden shadow-lg relative border-4 border-[#1a1a1a] z-0`}
    >
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg px-4 py-3 border-3 border-[#1a1a1a] z-[1000] pointer-events-none">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#dc2626]" />
          <span className="text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Food Popup
          </span>
        </div>
      </div>

      {/* Center indicator */}
      <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg px-4 py-3 border-3 border-[#1a1a1a] z-[1000] pointer-events-none">
        <span className="text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          📍 San Francisco
        </span>
      </div>
    </div>
  );
}
