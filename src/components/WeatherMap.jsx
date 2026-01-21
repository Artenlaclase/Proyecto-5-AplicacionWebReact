import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton, Chip } from '@mui/material';
import { Map as MapIcon, Thermostat, WaterDrop, Air } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
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

export default function WeatherMap({ lat, lon, city, country, weather }) {
    const [mapStyle, setMapStyle] = useState('standard');
    const position = [lat, lon];

    const mapStyles = {
        standard: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            label: 'Estándar'
        },
        topo: {
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
            label: 'Topográfico'
        },
        satellite: {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
            label: 'Satélite'
        }
    };

    const handleStyleChange = (event, newStyle) => {
        if (newStyle !== null) {
            setMapStyle(newStyle);
        }
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <MapIcon color="primary" sx={{ fontSize: 28 }} />
                        <Typography variant="h6" fontWeight="bold">
                            Ubicación y Mapa
                        </Typography>
                    </Box>
                </Box>

                {weather && (
                    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Chip 
                            icon={<Thermostat />} 
                            label={`${weather.temp}°C`} 
                            color="primary" 
                            size="small"
                        />
                        <Chip 
                            icon={<Air />} 
                            label={`${weather.windKph} km/h`} 
                            color="info" 
                            size="small"
                        />
                        <Chip 
                            icon={<WaterDrop />} 
                            label={`${weather.humidity}%`} 
                            color="secondary" 
                            size="small"
                        />
                    </Box>
                )}

                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <ToggleButtonGroup
                        value={mapStyle}
                        exclusive
                        onChange={handleStyleChange}
                        size="small"
                        sx={{ flexWrap: 'wrap' }}
                    >
                        <ToggleButton value="standard">
                            Estándar
                        </ToggleButton>
                        <ToggleButton value="topo">
                            Topográfico
                        </ToggleButton>
                        <ToggleButton value="satellite">
                            Satélite
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
                        zoom={10} 
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                        key={mapStyle}
                    >
                        <TileLayer
                            attribution={mapStyles[mapStyle].attribution}
                            url={mapStyles[mapStyle].url}
                        />
                        <Marker position={position}>
                            <Popup>
                                <strong>{city}</strong><br/>
                                {country}<br/>
                                {weather && (
                                    <>
                                        <br/>
                                        <strong>Temperatura:</strong> {weather.temp}°C<br/>
                                        <strong>Condición:</strong> {weather.conditionText}<br/>
                                        <strong>Viento:</strong> {weather.windKph} km/h {weather.windDir}<br/>
                                        <strong>Humedad:</strong> {weather.humidity}%<br/>
                                    </>
                                )}
                                <br/>
                                <small>Lat: {lat.toFixed(4)}, Lon: {lon.toFixed(4)}</small>
                            </Popup>
                        </Marker>
                        <MapUpdater center={position} />
                    </MapContainer>
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                    Estilo de mapa: {mapStyles[mapStyle].label}
                </Typography>
            </CardContent>
        </Card>
    );
}