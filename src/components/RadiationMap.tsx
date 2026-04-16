import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Fix Leaflet icon issue
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface HeatmapLayerProps {
  points: [number, number, number][];
}

function HeatmapLayer({ points }: HeatmapLayerProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // @ts-ignore - heatLayer is added by leaflet.heat
    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 5,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}

export default function RadiationMap({ lang }: { lang: 'ar' | 'en' }) {
  const heatPoints: [number, number, number][] = [
    [36.9, 50.7, 0.9], // Ramsar (High)
    [40.7, -74.0, 0.3], // New York
    [35.6, 139.6, 0.25], // Tokyo
    [39.7, -104.9, 0.5], // Denver
    [48.8, 2.3, 0.3], // Paris
    [24.7, 46.7, 0.28] // Riyadh
  ];

  const title = lang === 'ar' ? '🌍 خريطة الإشعاع العالمية (تقريبية)' : '🌍 Global Radiation Heatmap (Approximate)';
  const description = lang === 'ar' 
    ? 'توضح هذه الخريطة مستويات الإشعاع الطبيعي في مناطق مختلفة حول العالم بوحدة ملي سيفرت (mSv).' 
    : 'This map shows natural background radiation levels in different regions worldwide in milliSieverts (mSv).';

  return (
    <div className="mt-20 bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 shadow-2xl max-w-4xl mx-auto overflow-hidden">
      <h2 className="text-3xl font-bold text-[#39FF14] mb-4 flex items-center gap-3">
        {title}
      </h2>
      <p className="text-gray-400 mb-8">{description}</p>
      
      <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-gray-700">
        <MapContainer 
          center={[25, 20]} 
          zoom={2} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatmapLayer points={heatPoints} />
        </MapContainer>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>{lang === 'ar' ? 'مرتفع (> 0.8 mSv)' : 'High (> 0.8 mSv)'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>{lang === 'ar' ? 'متوسط (0.4 - 0.7 mSv)' : 'Medium (0.4 - 0.7 mSv)'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>{lang === 'ar' ? 'منخفض (< 0.3 mSv)' : 'Low (< 0.3 mSv)'}</span>
        </div>
      </div>
    </div>
  );
}
