import { Card, CardContent, Typography, Box, Grid, Chip } from '@mui/material';
import { Air, Warning, CheckCircle } from '@mui/icons-material';

export default function AirQuality({ airQuality }) {
    if (!airQuality) return null;

    const getAQILevel = (usEpaIndex) => {
        if (usEpaIndex === 1) return { level: 'Buena', color: '#00e400', icon: <CheckCircle /> };
        if (usEpaIndex === 2) return { level: 'Moderada', color: '#ffff00', icon: <Warning /> };
        if (usEpaIndex === 3) return { level: 'Dañina para grupos sensibles', color: '#ff7e00', icon: <Warning /> };
        if (usEpaIndex === 4) return { level: 'Dañina', color: '#ff0000', icon: <Warning /> };
        if (usEpaIndex === 5) return { level: 'Muy dañina', color: '#8f3f97', icon: <Warning /> };
        if (usEpaIndex === 6) return { level: 'Peligrosa', color: '#7e0023', icon: <Warning /> };
        return { level: 'Desconocido', color: '#gray', icon: <Air /> };
    };

    const aqiInfo = getAQILevel(airQuality['us-epa-index']);

    return (
        <Card 
            sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                height: '100%'
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Air sx={{ fontSize: 28 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Calidad del Aire
                    </Typography>
                </Box>

                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Chip
                        icon={aqiInfo.icon}
                        label={aqiInfo.level}
                        sx={{
                            backgroundColor: aqiInfo.color,
                            color: aqiInfo.color === '#ffff00' ? '#000' : '#fff',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            padding: '20px 10px',
                            '& .MuiChip-icon': {
                                color: aqiInfo.color === '#ffff00' ? '#000' : '#fff',
                            }
                        }}
                    />
                    <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.9 }}>
                        Índice EPA: {airQuality['us-epa-index']}
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', 
                            padding: 1.5, 
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                CO
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {airQuality.co.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                μg/m³
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', 
                            padding: 1.5, 
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                NO₂
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {airQuality.no2.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                μg/m³
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', 
                            padding: 1.5, 
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                O₃
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {airQuality.o3.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                μg/m³
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', 
                            padding: 1.5, 
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                SO₂
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {airQuality.so2.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                μg/m³
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', 
                            padding: 1.5, 
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                PM2.5
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {airQuality.pm2_5.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                μg/m³
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.15)', 
                            padding: 1.5, 
                            borderRadius: 2,
                            textAlign: 'center'
                        }}>
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                PM10
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {airQuality.pm10.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                μg/m³
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
