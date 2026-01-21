import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Divider } from "@mui/material";
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { getCountryFlag } from '../utils/countryFlags';

export default function WeatherDisplay({ weather }) {
    const flag = getCountryFlag(weather.country);
    return (
        <Card
            sx={{
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                color: 'white',
                boxShadow: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "grid",
                        gap: 2,
                        textAlign: "center",
                    }}
                >
                    <Box sx={{ fontSize: '3rem' }}>
                        {flag}
                    </Box>
                    <Typography variant="h4" component="h2" fontWeight="bold">
                        {weather.city}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                        {weather.region && `${weather.region}, `}{weather.country}
                    </Typography>
                    <Box
                        component="img"
                        alt={weather.conditionText}
                        src={weather.icon}
                        sx={{ margin: "0 auto", width: 80, height: 80 }}
                    />
                    <Typography variant="h3" component="h3" fontWeight="bold">
                        {weather.temp}°C
                    </Typography>
                    <Typography variant="h6" component="h4" sx={{ opacity: 0.9 }}>
                        {weather.conditionText}
                    </Typography>

                    <Divider sx={{ my: 1, bgcolor: 'rgba(255,255,255,0.3)' }} />

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <AirIcon sx={{ fontSize: 30, mb: 1 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Viento
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {weather.windKph} km/h
                                </Typography>
                                <Typography variant="caption">
                                    {weather.windDir}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <WaterDropIcon sx={{ fontSize: 30, mb: 1 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Humedad
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {weather.humidity}%
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ThermostatIcon sx={{ fontSize: 30, mb: 1 }} />
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    Sensación
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {weather.feelsLike}°C
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}
