import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider, Chip } from "@mui/material";
import WavesIcon from '@mui/icons-material/Waves';
import AirIcon from '@mui/icons-material/Air';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import HeightIcon from '@mui/icons-material/Height';
import CompressIcon from '@mui/icons-material/Compress';

export default function MarineInfo({ marineData }) {
    if (!marineData) return null;

    const formatTime = (tide) => {
        let timestamp = tide.dt || tide.timestamp || tide.time;
        
        if (!timestamp || typeof timestamp !== 'number') {
            return 'N/A';
        }
        
        const date = new Date(timestamp * 1000);
        
        if (!isNaN(date.getTime())) {
            return date.toLocaleTimeString('es-CL', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            });
        }
        
        return 'N/A';
    };

    const getTideIcon = (type) => {
        return type === 'High' ? <TrendingUpIcon /> : <TrendingDownIcon />;
    };

    const getTideLabel = (type) => {
        return type === 'High' ? 'Marea Alta' : 'Marea Baja';
    };

    const getWaveCondition = (height) => {
        if (!height) return { label: 'Desconocido', color: 'default' };
        if (height < 0.5) return { label: 'Muy Calmado', color: 'success' };
        if (height < 1) return { label: 'Calmado', color: 'success' };
        if (height < 1.5) return { label: 'Moderado', color: 'info' };
        if (height < 2.5) return { label: 'Agitado', color: 'warning' };
        return { label: 'Muy Agitado', color: 'error' };
    };

    const waveCondition = getWaveCondition(marineData.waveHeight);

    return (
        <Card sx={{ boxShadow: 2, height: '100%' }}>
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
                        fontWeight: 'bold',
                        mb: 2
                    }}
                >
                    <WavesIcon />
                    🌊 Condiciones del Mar
                </Typography>

                {/* Información de Olas */}
                {marineData.waveHeight !== undefined && (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Estado del Mar
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Chip 
                                    label={waveCondition.label} 
                                    color={waveCondition.color}
                                    sx={{ fontWeight: 'bold' }}
                                />
                            </Box>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box sx={{ 
                                        p: 2, 
                                        borderRadius: 1, 
                                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                        textAlign: 'center'
                                    }}>
                                        <HeightIcon color="primary" />
                                        <Typography variant="caption" display="block" color="text.secondary">
                                            Altura de Olas
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" color="primary">
                                            {marineData.waveHeight.toFixed(1)} m
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ 
                                        p: 2, 
                                        borderRadius: 1, 
                                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                        textAlign: 'center'
                                    }}>
                                        <CompressIcon color="primary" />
                                        <Typography variant="caption" display="block" color="text.secondary">
                                            Período de Olas
                                        </Typography>
                                        <Typography variant="h5" fontWeight="bold" color="primary">
                                            {marineData.wavePeriod || 'N/A'} s
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* Información de Viento Marino */}
                {marineData.windSpeed && (
                    <>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Viento en la Costa
                            </Typography>
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 1, 
                                backgroundColor: 'rgba(156, 39, 176, 0.08)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AirIcon color="secondary" />
                                    <Typography variant="body1" fontWeight="bold">
                                        Velocidad del Viento
                                    </Typography>
                                </Box>
                                <Typography variant="h6" fontWeight="bold" color="secondary">
                                    {marineData.windSpeed} km/h {marineData.windDirection}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />
                    </>
                )}

                {/* Información de Mareas */}
                {marineData.tides && marineData.tides.length > 0 && (
                    <>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Horarios de Mareas para Hoy
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontStyle: 'italic' }}>
                            💡 <strong>Marea Alta</strong>: Nivel máximo del agua. <strong>Marea Baja</strong>: Nivel mínimo del agua.
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {marineData.tides.slice(0, 4).map((tide, index) => (
                                <Box
                                    key={index}
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
                                            <Typography variant="body2" fontWeight="bold">
                                                {getTideLabel(tide.type)}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" fontWeight="medium">
                                                {formatTime(tide)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body1" fontWeight="bold" color="primary">
                                            {tide.height.toFixed(2)} m
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            altura
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center', fontStyle: 'italic' }}>
                    📍 Datos válidos para esta ubicación costera
                </Typography>
            </CardContent>
        </Card>
    );
}
