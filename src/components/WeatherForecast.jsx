import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

export default function WeatherForecast({ forecast }) {
    if (!forecast || !forecast.length) return null;

    const getDayName = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        return days[date.getDay()];
    };

    const isToday = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    const isTomorrow = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return date.getDate() === tomorrow.getDate() &&
               date.getMonth() === tomorrow.getMonth() &&
               date.getFullYear() === tomorrow.getFullYear();
    };

    const getDayLabel = (dateStr) => {
        if (isToday(dateStr)) return 'Hoy';
        if (isTomorrow(dateStr)) return 'Mañana';
        return getDayName(dateStr);
    };

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
                        color: 'primary.main',
                        fontWeight: 'bold'
                    }}
                >
                    <WbSunnyIcon />
                    Pronóstico de {forecast.length} días
                </Typography>
                
                <Grid container spacing={1.5} sx={{ mt: 1 }}>
                    {forecast.map((day, index) => (
                        <Grid item xs={12} key={index}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                        transform: 'translateX(5px)',
                                        boxShadow: 2,
                                    }
                                }}
                            >
                                {/* Día */}
                                <Box sx={{ flex: '0 0 60px' }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {getDayLabel(day.date)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(day.date + 'T00:00:00').getDate()}/{new Date(day.date + 'T00:00:00').getMonth() + 1}
                                    </Typography>
                                </Box>

                                {/* Icono y condición */}
                                <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                                    <Box
                                        component="img"
                                        src={day.icon}
                                        alt={day.condition}
                                        sx={{ width: 40, height: 40, flexShrink: 0 }}
                                    />
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            display: { xs: 'none', sm: 'block' },
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {day.condition}
                                    </Typography>
                                </Box>

                                {/* Temperaturas */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    flex: '0 0 90px',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Typography variant="body2" fontWeight="bold" color="error.main">
                                        {Math.round(day.maxTemp)}°
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {Math.round(day.minTemp)}°
                                    </Typography>
                                </Box>

                                {/* Info adicional */}
                                <Box sx={{ 
                                    display: { xs: 'none', lg: 'flex' }, 
                                    gap: 2,
                                    flex: '0 0 140px',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <AirIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="caption">
                                            {Math.round(day.windKph)} km/h
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <WaterDropIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="caption">
                                            {day.humidity}%
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
}
