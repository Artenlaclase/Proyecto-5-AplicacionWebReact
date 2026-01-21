import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Map as MapIcon } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L from 'leaflet';

// Configurar iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para centrar el mapa
function MapUpdater({ center }) {
    const map = useMap();
    
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
}

export default function WeatherMap({ lat, lon, city, country }) {
    const [mapLayer, setMapLayer] = useState('temp');
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo'; // Usa API key de OpenWeatherMap
    
    const position = [lat, lon];

    const layers = {
        temp: {
            url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            label: 'Temperatura'
        },
        precipitation: {
            url: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            label: 'Precipitación'
        },
        clouds: {
            url: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            label: 'Nubes'
        },
        wind: {
            url: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
            label: 'Viento'
        }
    };

    const handleLayerChange = (event, newLayer) => {
        if (newLayer !== null) {
            setMapLayer(newLayer);
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <MapIcon color="primary" sx={{ fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Mapa Meteorológico
                    </Typography>
                </Box>

                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup
                        value={mapLayer}
                        exclusive
                        onChange={handleLayerChange}
                        size="small"
                        sx={{ flexWrap: 'wrap' }}
                    >
                        <ToggleButton value="temp">
                            Temp
                        </ToggleButton>
                        <ToggleButton value="precipitation">
                            Lluvia
                        </ToggleButton>
                        <ToggleButton value="clouds">
                            Nubes
                        </ToggleButton>
                        <ToggleButton value="wind">
                            Viento
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ 
                    height: 400, 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    border: '1px solid #e0e0e0'
                }}>
                    <MapContainer 
                        center={position} 
                        zoom={8} 
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <TileLayer
                            url={layers[mapLayer].url}
                            attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
                            opacity={0.6}
                        />
                        <Marker position={position}>
                            <Popup>
                                <strong>{city}</strong><br/>
                                {country}<br/>
                                Lat: {lat.toFixed(4)}<br/>
                                Lon: {lon.toFixed(4)}
                            </Popup>
                        </Marker>
                        <MapUpdater center={position} />
                    </MapContainer>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                    Capa actual: {layers[mapLayer].label}
                </Typography>
            </CardContent>
        </Card>
    );
}
