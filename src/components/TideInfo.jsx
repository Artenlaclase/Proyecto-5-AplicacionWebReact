import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import WavesIcon from '@mui/icons-material/Waves';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function TideInfo({ tideData }) {
    if (!tideData || !tideData.extremes || tideData.extremes.length === 0) return null;

    const formatTime = (timestamp) => {
        // El timestamp ya viene en segundos Unix, lo convertimos a milisegundos
        const date = new Date(timestamp * 1000);
        
        // Verificar si la fecha es válida
        if (isNaN(date.getTime())) {
            return 'Hora no disponible';
        }
        
        return date.toLocaleTimeString('es-CL', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    };

    const getTideIcon = (type) => {
        return type === 'High' ? <TrendingUpIcon /> : <TrendingDownIcon />;
    };

    const getTideLabel = (type) => {
        return type === 'High' ? 'Marea Alta' : 'Marea Baja';
    };

    return (
        <Card sx={{ mt: 3, boxShadow: 2 }}>
            <CardContent>
                <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        color: 'info.main',
                        fontWeight: 'bold'
                    }}
                >
                    <WavesIcon />
                    🌊 Información de Mareas
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Horarios y alturas de las mareas para hoy:
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontStyle: 'italic' }}>
                    💡 <strong>Marea Alta</strong>: Nivel máximo del agua. <strong>Marea Baja</strong>: Nivel mínimo del agua.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {tideData.extremes.slice(0, 4).map((tide, index) => (
                        <Box key={index}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    p: 1.5,
                                    borderRadius: 1,
                                    backgroundColor: tide.type === 'High' 
                                        ? 'rgba(33, 150, 243, 0.08)' 
                                        : 'rgba(156, 39, 176, 0.08)',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        backgroundColor: tide.type === 'High' 
                                            ? 'rgba(33, 150, 243, 0.15)' 
                                            : 'rgba(156, 39, 176, 0.15)',
                                        transform: 'translateX(5px)',
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {getTideIcon(tide.type)}
                                    <Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {getTideLabel(tide.type)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                            {formatTime(tide.timestamp)}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" fontWeight="bold" color="primary">
                                        {tide.height.toFixed(2)} m
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        altura
                                    </Typography>
                                </Box>
                            </Box>
                            {index < Math.min(tideData.extremes.length - 1, 3) && (
                                <Divider sx={{ my: 0.5 }} />
                            )}
                        </Box>
                    ))}
                </Box>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center', fontStyle: 'italic' }}>
                    📍 Datos válidos solo para esta ubicación costera. Las mareas varían según la ubicación.
                </Typography>
            </CardContent>
        </Card>
    );
}
